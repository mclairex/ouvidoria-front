import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Cards from '../components/Cards';
import { useComplaints } from '../context/ReclamacoesContextType';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    list,
    status,
    page,
    totalPages,
    setPage,
  } = useComplaints();

  useEffect(() => {
    setPage(0);
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom sx={{ color: '#7C3AED' }}>
        Minhas Reclamações
      </Typography>
      <Typography variant="subtitle1" mb={3}>
        Aqui estão listadas todas as suas reclamações ativas.
      </Typography>

      {status === 'loading' && (
        <Box textAlign="center" mt={4}>
          <CircularProgress sx={{ color: '#7C3AED' }} />
          <Typography mt={2}>Carregando reclamações...</Typography>
        </Box>
      )}

      {status === 'succeeded' && list.length === 0 && (
        <Alert severity="info">Nenhuma reclamação encontrada.</Alert>
      )}

      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        gap={2}
      >
        {status === 'succeeded' &&
          list.map((c) => (
            <Cards
              key={c.id}
              complaint={c}
              onClick={() => navigate(`/complaints/${c.id}`)}
            />
          ))}
      </Box>

      {status === 'succeeded' && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              sx={{
                borderColor: '#7C3AED',
                color: '#7C3AED',
                '&:hover': { backgroundColor: '#EDE9FE' },
              }}
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage(page + 1)}
              disabled={page + 1 >= totalPages}
              sx={{
                borderColor: '#7C3AED',
                color: '#7C3AED',
                '&:hover': { backgroundColor: '#EDE9FE' },
              }}
            >
              &gt;
            </Button>
          </Stack>
        </Box>
      )}
    </Layout>
  );
};

export default Dashboard;
