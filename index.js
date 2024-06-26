const express = require("express");
const db = require("./db-config.js");
const cors = require('cors');
const morgan = require('morgan');
const verifyToken = require('./middlewares/ValidateToken.js');
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoute.js");
const CampaignRoutes = require ('./routes/CampignRoute.js');
const AzureRoutes = require('./routes/AzureRoute.js');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined')); // Puedes ajustar el formato de registro según tus necesidades

// Rutas
app.use("/api/users", UserRoutes);
app.use("/api/campaigns", CampaignRoutes);
app.use('/api', AzureRoutes);

// Middleware de verificación de token
app.use(verifyToken);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
db.run().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Error connecting to database:', err.message);
});
