import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import logo from '../Images/jodah.png'

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Light background, matches theme
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: '200px', height: '100px', marginBottom: '16px' }}
      />
      <CircularProgress size={40} sx={{color:'#600018'}}/>
      <Typography variant="h6" sx={{ mt: 2, color: '#600018' }}>
        Loading Financial Data...
      </Typography>
    </Box>
  );
}

export default LoadingScreen;