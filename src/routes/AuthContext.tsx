import { createContext, useState, useEffect, useContext, type ReactNode, } from 'react';
import { CircularProgress, Box } from '@mui/material';
import api from '../services/axios';
import { toast } from 'react-toastify';


type UserInfo = {
  name(name: any): unknown;
  fullName: string;
  emailAddress: string;
  cpfNumber: string;
};

type AuthContextData = {
  token: string | null;
  user: UserInfo | null;
  login: (jwt: string) => Promise<void>;
  logout: () => void;
};

const AuthCtx = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);


  const configAxios = (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

 
  async function login(token: string) {
    try {
      setJwtToken(token);
      localStorage.setItem('app_token', token);
      configAxios(token);

      const res = await api.get('/users/me');
      const { name, email, cpf } = res.data;

      setCurrentUser({
        fullName: name,
        emailAddress: email,
        cpfNumber: cpf,
        name: ''
      });
    } catch {
      logout();
    }
  }


  function logout() {
    setJwtToken(null);
    setCurrentUser(null);
    localStorage.removeItem('app_token');
    configAxios(null);
    toast.error('Sua sessão terminou. Faça login novamente.');

    setTimeout(() => {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }, 200);
  }

 
  useEffect(() => {
    const storedToken = localStorage.getItem('app_token');

    if (storedToken) {
      configAxios(storedToken);
      api.get('/users/me')
        .then(res => {
          setJwtToken(storedToken);
          const { name, email, cpf } = res.data;
          setCurrentUser({
            fullName: name,
            emailAddress: email,
            cpfNumber: cpf,
            name: '',
          });
        })
        .catch(() => logout())
        .finally(() => setLoadingAuth(false));
    } else {
      setLoadingAuth(false);
    }
  }, []);

  if (loadingAuth) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#121212',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthCtx.Provider
      value={{
        token: jwtToken,
        user: currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return context;
}
