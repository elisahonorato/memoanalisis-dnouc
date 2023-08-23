import React from 'react';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './theme';
import PdfAnalyzer from './pdfAnalyzer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PdfAnalyzer />
    </ThemeProvider>
  );
}

export default App;
