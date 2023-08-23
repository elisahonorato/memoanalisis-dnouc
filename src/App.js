import React, { useState } from 'react';
import './App.css';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

function App() {
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
    <div className="App">
      <h1 className="app-title">PDF Analyzer</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />

      <div className="messages">
        {successMessages.map((message, index) => (
          <p key={index} className="success-message">{message}</p>
        ))}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      
      {file && !errorMessage && <p className="success-message">Archivo cargado y validado. Continuar con el análisis.</p>}
    </div>
  );
}

export default App;
