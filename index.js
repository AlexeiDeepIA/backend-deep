const express = require("express");
const db = require("./db-config.js");
const cors = require('cors');
const morgan = require('morgan');
const verifyToken = require('./middlewares/ValidateToken.js');
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoute.js");
const CammpaignRoutes = require("./routes/CampignRoute.js");
const Azure = require('./routes/AzureRoute.js')

const app = express();
const port = process.env.PORT;

db.run();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.use("/api/users", UserRoutes);
app.use("/api/campaigns", CammpaignRoutes)
app.use('/api', Azure);
app.use(verifyToken);
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
