import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await api.post('/auth/login', form)
      const { token } = response.data

      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Usuário não encontrado. Faça seu cadastro.')
      } else if (err.response?.status === 401) {
        setError('Senha incorreta.')
      } else {
        setError('Erro ao fazer login.')
      }
    }
  }

  return (
    <Container
      sx={{
        backgroundColor: '#1e1b2e', // Fundo geral
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          backgroundColor: '#29243d', // Card
          color: '#f5f5f5',
          border: '1px solid #444',
          borderRadius: 2,
          padding: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            color: 'white',
          }}
        >
          <TextField
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              style: { color: '#f5f5f5' },
            }}
            InputLabelProps={{
              style: { color: '#b0aec0' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#8b5cf6',
                },
                '&:hover fieldset': {
                  borderColor: '#a78bfa',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#c084fc',
                },
              },
            }}
          />

          <TextField
            label="Senha"
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              style: { color: '#f5f5f5' },
            }}
            InputLabelProps={{
              style: { color: '#b0aec0' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#8b5cf6',
                },
                '&:hover fieldset': {
                  borderColor: '#a78bfa',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#c084fc',
                },
              },
            }}
          />

          <Link
            href="/cadastro"
            underline="hover"
            sx={{
              fontSize: '0.9rem',
              color: '#a78bfa',
              textAlign: 'right',
              marginTop: 1,
            }}
          >
            Não tem login? Cadastre-se
          </Link>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: '#8b5cf6',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#7c3aed',
              },
            }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
