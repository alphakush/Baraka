require('./models/User');
require('./models/Bars');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const barRoutes = require('./routes/barRoutes');

const app = express();
app.use(bodyParser.json());

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
    res.send('Sa marche');
    });

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
