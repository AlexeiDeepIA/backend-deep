const CampaignController = require("../controller/CampaignController");
const csv = require('csv-parser');
const multer = require('multer');
const upload = multer();
const express = require('express');
const router = express.Router();

router.post('/read-csv', upload.single('csvFile'), (req, res) => {
  // Validar si se proporcionó un archivo y si el archivo tiene datos
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({
      success: false,
      message: 'No se proporcionó ningún archivo o el archivo está vacío',
    });
  }

  const csvData = req.file.buffer.toString();
  const data = [];

  const stream = require('stream');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(csvData));

  bufferStream
    .pipe(csv())
    .on('data', (row) => {
      const formattedRow = {}; // Objeto para almacenar los datos formateados
      // Iterar sobre las claves (columnas) en la fila
      Object.keys(row).forEach((key) => {
        // Formatear cada valor para eliminar espacios en blanco y convertir a minúsculas
        const formattedValue = row[key].trim().toLowerCase();
        // Asignar el valor formateado al objeto de fila
        formattedRow[key] = formattedValue;
      });
      // Agregar la fila formateada al arreglo de datos
      data.push(formattedRow);
    })
    .on('end', () => {
      console.log('CSV leído correctamente');
      // Devolver los datos en formato JSON
      res.json(data);
    })
    .on('error', (error) => {
      console.error('Error al leer el CSV:', error);
      res.status(500).json({
        success: false,
        message: 'Error al leer el CSV',
        error: error.message,
      });
    });
});



router.post('/save-data', async (req, res) =>{
    CampaignController.createModel(req, res);
});

router.post('/create', async (req, res) => {
  CampaignController.createUserCampaigns(req, res);
});


module.exports = router;
