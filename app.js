const express = require('express');
const app = express()
const PORT =  8080
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json')
//database
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const DATABASEURL = process.env.DATABASEURL;


// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

//routes
app.use(bodyParser.json())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/',require('./routes/index'))





let database;
mongoose
  .connect(DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "healthtask",
  })
  .then((result) => {
    app.listen(PORT);
    database = result;
    //console.log(result)
    console.log("connection to database successfull");
  })
  .catch((err) => {
    console.log(err);
  });