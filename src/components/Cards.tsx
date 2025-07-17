import React from 'react';
import {
  Card, CardContent, Typography, Stack, Fade, Box, Tooltip, Divider,
} from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIos';
import { type ComplaintListDto } from '../types/reclamacoesTypes';

interface Props {
  complaint: ComplaintListDto;
  onClick: () => void;
}

const ComplaintCard: React.FC<Props> = ({ complaint, onClick }) => {
  return (
    <Fade in timeout={500}>
      <Tooltip title="Clique para visualizar detalhes" arrow>
        <Card
          onClick={onClick}
          sx={{
            background: 'linear-gradient(145deg, #EDE9FE, #F5F3FF)',
            color: '#4C1D95',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.2)',
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0 6px 30px rgba(124, 58, 237, 0.3)',
            },
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Typography variant="h6" noWrap color="inherit">
                {complaint.title}
              </Typography>
            </Stack>
            <Typography variant="body2" color="#4B5563">
              Resumo: {complaint.resumedDescription}
            </Typography>
            <Typography variant="body2" color="#4B5563">
              Data de criação: {new Date(complaint.createdAt).toLocaleDateString('pt-br')}
            </Typography>
          </CardContent>

          <Divider sx={{ borderColor: '#D8B4FE', mx: 2 }} />

          <Box
            px={2}
            py={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ color: '#6B21A8', fontSize: '0.85rem' }}
          >
            <Typography variant="caption">
              Clique para visualizar detalhes
            </Typography>
            <ArrowForwardIosRoundedIcon fontSize="small" sx={{ fontSize: 14 }} />
          </Box>
        </Card>
      </Tooltip>
    </Fade>
  );
};

export default ComplaintCard;
