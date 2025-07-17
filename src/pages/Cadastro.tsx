import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material'
import api from '../services/axios'

export default function Register() {
  const [form, setForm] = useState({
    cpf: '',
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      const { confirmarSenha, ...dados } = form
      const response = await api.post('/usuarios', dados)
      console.log(response.data)
      setSuccess(true)
      setForm({
        cpf: '',
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
      })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1e1b2e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#29243d',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          color: '#f5f5f5',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          Cadastro
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Cadastro realizado com sucesso!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="CPF"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
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
            label="Nome Completo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
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
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
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
            label="Confirmar Senha"
            name="confirmarSenha"
            type="password"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
            error={
              form.senha !== form.confirmarSenha &&
              form.confirmarSenha !== ''
            }
            helperText={
              form.senha !== form.confirmarSenha &&
              form.confirmarSenha !== ''
                ? 'As senhas não coincidem.'
                : ''
            }
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

          <Button
            type="submit"
            variant="contained"
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
            Cadastrar
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
