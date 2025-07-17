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

export default function Reclamacao() {
  const [form, setForm] = useState({
    cpf: '',
    titulo: '',
    descricao: '',
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

    try {
      const response = await api.post('/reclamacoes', form)
      console.log(response.data)
      setSuccess(true)
      setForm({
        cpf: '',
        titulo: '',
        descricao: '',
      })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar reclamação.')
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
          Nova Reclamação
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Reclamação enviada com sucesso!
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
            label="CPF do Usuário"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            InputProps={{ style: { color: '#f5f5f5' } }}
            InputLabelProps={{ style: { color: '#b0aec0' } }}
          />

          <TextField
            label="Título da Reclamação"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            InputProps={{ style: { color: '#f5f5f5' } }}
            InputLabelProps={{ style: { color: '#b0aec0' } }}
          />

          <TextField
            label="Descrição da Reclamação"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            multiline
            rows={4}
            required
            InputProps={{ style: { color: '#f5f5f5' } }}
            InputLabelProps={{ style: { color: '#b0aec0' } }}
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
            Enviar Reclamação
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

