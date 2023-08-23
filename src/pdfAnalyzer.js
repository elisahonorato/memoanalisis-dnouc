
import React, { useState } from 'react';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import theme from './theme';


function PdfAnalyzer() {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessages, setSuccessMessages] = useState([]);
  
    const isValidFile = (file) => {
      const allowedFileExtensions = ['PDF', 'pdf'];
      const maxBytes = 25 
      const maxFileSize = maxBytes * 1024 * 1024; // 25 MB in bytes
  
      const fileName = file.name;
      const fileNameUpperCase = fileName.toUpperCase(); // Convert to uppercase
  
      console.log('File name:', fileName, file.name);
      const fileSize = file.size;
      const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      
      
      if (!allowedFileExtensions.includes(fileExtension)) {
        setErrorMessage('Tipo de archivo no permitido');
        return false;
      }
  
      setSuccessMessages([`Extensión válida: (${fileExtension})`]);
  
      if (fileSize > maxFileSize) {
        setErrorMessage('El archivo es demasiado grande');
        return false;
      }
      setSuccessMessages((prevMessages) => prevMessages.concat(`Tamaño válido: (Menor a ${maxBytes} bytes)`));
  
  
      if (fileName !== fileNameUpperCase) { // Compare filenames without considering case
        setErrorMessage('El nombre del archivo no es válido');
        return false;
      }
      setSuccessMessages((prevMessages) => prevMessages.concat(`Nombre válido: (${fileName})`));
  
      setErrorMessage('');
      return true;
    };
  
    const handleFileChange = async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile && isValidFile(selectedFile)) {
        setFile(selectedFile);
        await analyzePdf(selectedFile);
      } else {
        setFile(null);
      }
    };
  
    const analyzePdf = async (pdfFile) => {
      try {
        const pdfData = new Uint8Array(await pdfFile.arrayBuffer());
        const pdfDocument = await pdfjsLib.getDocument({ data: pdfData, worker: pdfjsWorker }).promise;
        
        console.log('PDF Analysis:', pdfDocument); // Replace with your analysis logic
      } catch (error) {
        console.error('Error analyzing PDF:', error);
      }
    };
  
    return (
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: theme.palette.primary.light, padding: '20px', textAlign: 'center', borderRadius: '8px', marginTop: '16px', marginBottom: '16px' }}>
            <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: '16px' }}>
              Analiza tu PDF
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              Selecciona un archivo PDF
            </Typography>
            <Box component="div" sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <input type="file" accept=".pdf" onChange={handleFileChange} />

            </Box>
            <div sx={{ marginTop: '16px' }}>
              {successMessages.map((message, index) => (
                <Typography key={index} sx={{ color: theme.palette.success.main, margin: '5px 0' }}>
                  {message}
                </Typography>
              ))}
              {errorMessage && <Typography sx={{ color: theme.palette.error.main, margin: '5px 0' }}>{errorMessage}</Typography>}
            </div>
            {file && !errorMessage && (
              <p sx={{ color: theme.palette.primary.main, margin: '5px 0' }}>Archivo cargado y validado. Continuar con el análisis.</p>
            )}
          </Box>
        </Container>
      
      );
    }
    
    export default PdfAnalyzer;

  