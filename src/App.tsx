import React from 'react';
import './App.css';
import MainDataEntryPage from './pages/MainDataEntryPage';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Container } from '@mui/material';

// Attempt to import the logo - ensure you have thdclogo.png in src/assets/
let logoUrl = '' // Default empty string
try {
  logoUrl = require('./assets/thdclogo.png');
} catch (e) {
  console.warn('Logo not found at ./assets/thdclogo.png. Please add it for it to display.');
  // You could use a placeholder URL here if you have one, e.g.:
  // logoUrl = 'https://via.placeholder.com/150x50?text=Logo'; 
}

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline /> {/* Ensures consistent baseline styling */}
      <AppBar position="static" sx={{ backgroundColor: '#003366' /* Dark blue, adjust as needed */ }}>
        <Toolbar>
          {logoUrl && (
            <Box 
              sx={{
                backgroundColor: 'white',
                p: 0.5, // Small padding around the logo inside the white box
                mr: 2, // Margin to the right, separating from title
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px' // Optional: slightly rounded corners for the white box
              }}
            >
              <img 
                src={logoUrl} 
                alt="THDC India Ltd Logo"
                style={{ 
                  height: '100px', // Adjust as needed, slightly smaller to fit padding
                  display: 'block' // Prevents extra space below img
                }} 
              />
            </Box>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            THDC Health Report Generator
          </Typography>
          {/* You can add other AppBar items here if needed, e.g., a user menu */}
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flexGrow: 1, py: 3 }} maxWidth={false}>
        <MainDataEntryPage />
      </Container>

      <Box component="footer" sx={{ py: 2, px: 2, mt: 'auto', backgroundColor: '#f5f5f5' /* Light grey footer */ }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} THDC India Ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
