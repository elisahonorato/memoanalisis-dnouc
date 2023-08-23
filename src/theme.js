import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      dark: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
        main: '#FF0000',
    
    },
    success: {
        main: '#388E3C', 
    },

  },
  customStyles: {
    root: {
      backgroundColor: '#cfe8fc',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px',
      marginTop: '16px',
      marginBottom: '16px',
    },
    title: {
      marginBottom: '16px',
    },
    input: {
      display: 'none',
    },
    messages: {
      marginTop: '16px',
    },
    successMessage: {
      color: 'green',
      margin: '5px 0',
    },
    errorMessage: {
      color: 'red',
      margin: '5px 0',
    },
  },
});

export default theme;
