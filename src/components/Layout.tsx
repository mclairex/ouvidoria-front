import React, { type ReactNode } from 'react';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#7C3AED' }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Ouvidoria Digital
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            bgcolor: '#F5F3FF',
            p: 3,
            borderRadius: 2,
            minHeight: '80vh',
            boxShadow: '0 4px 10px rgba(124, 58, 237, 0.2)',
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
