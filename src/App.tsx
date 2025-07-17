import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import { PrivateRoute } from './routes/PrivateRoute'
import Reclamacao from './pages/ReclamacaoForm'
import { ComplaintsProvider } from './context/ReclamacoesContextType'

export default function App() {
  return (
    <ComplaintsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/reclamacoes" element={<Reclamacao />} />
         

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </ComplaintsProvider>
  )
}
