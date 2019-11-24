require('./models/User');
require('./models/Bars');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const barRoutes = require('./routes/barRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Documentation/swagger');

const port = process.env.PORT || 1337;

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);
app.use(barRoutes);

const mongoUri =
    'mongodb+srv://admin:hHd1u5az8w3DH3c0@cluster0-wntcu.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri,{
    useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connectiong to mongo", err);
});

app.get('/',(req,res) => {
    res.sendFile(__dirname +'/Documentation/welcome.html');
    });

app.listen(port, () => {
    console.log('Listening on port' + port);
});
