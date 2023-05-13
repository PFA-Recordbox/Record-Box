const path = require("path");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//remember to add endpoint
app.use('/', express.static(path.resolve(__dirname, '')));












//global error handler 
app.use((err, req, res, next) => {
    console.error(err);
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});





app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;