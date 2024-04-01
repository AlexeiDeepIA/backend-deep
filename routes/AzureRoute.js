const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { ShareServiceClient, StorageSharedKeyCredential } = require('@azure/storage-file-share');

const router = express.Router();

// Configuración de Multer para manejar archivos entrantes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

// Credenciales de Azure Blob Storage
const accountName = process.env.ACCOUNT_NAME;
const accountKey = process.env.SHARED_KEY;
const shareUri = process.env.SHARE_URI;

// Crear una instancia del servicio de File Share
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const shareServiceClient = new ShareServiceClient(shareUri, sharedKeyCredential);

router.post('/upload', upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file provided');
  }

  const file = req.file;
  const fileName = file.originalname;
  const directoryName = ''; // Especifica el nombre del directorio dentro del recurso compartido

  try {
    const shareClient = shareServiceClient.getShareClient(directoryName);

    // Verificar si el directorio existe y crearlo si no existe
    const directoryClient = shareClient.getDirectoryClient(directoryName);
    const directoryExists = await directoryClient.exists();
    if (!directoryExists) {
      await directoryClient.create();
      console.log('Directory created successfully:', directoryName); // Agrega un mensaje para verificar en la consola
    }

    const fileClient = directoryClient.getFileClient(fileName);
    const contentType = file.mimetype;
    await fileClient.setHttpHeaders({ fileContentType: contentType });

    const xmsdate = new Date().toUTCString();
    const canonicalizedResource = `/${accountName}/${shareUri}/${fileName}`.toLowerCase();
    const stringToSign = `PUT\n\n\n${file.size}\n\n\n\n\n\n\n\n\n${canonicalizedResource}`;
    const key = Buffer.from(accountKey, 'base64');
    const signature = crypto.createHmac('sha256', key).update(stringToSign, 'utf-8').digest('base64');
    const authorization = `SharedKey ${accountName}:${signature}`;

    const uploadOptions = {
      fileHTTPHeaders: {
        'x-ms-date': xmsdate,
        'x-ms-version': '2020-08-04', // Última versión de la API de Azure Storage
        'Authorization': authorization,
        'Content-Type': file.mimetype
      }      
    };

    // Convertir el buffer del archivo a un Stream para la carga
    await fileClient.uploadData(file.buffer, uploadOptions);

    console.log('File uploaded successfully:', fileName); // Agrega un mensaje para verificar en la consola
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error uploading file:', err.message); // Agrega un mensaje de error detallado
    res.status(500).send(`Error uploading file: ${err.message}`);
  }
});

module.exports = router;
