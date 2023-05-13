const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
//const userController = require("./controller/userController");
const router = require("./routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//remember to add endpoint
//app.use("/", express.static(path.resolve(__dirname, "")));

// statick page
app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, "../client/index.html"));
});

// signup
app.get("/signup", router);
app.post("/signup", router);
// (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, "../client/index.html")); //// ??? index html ???
// });

// login
app.post("/login", router);

// app.post('/signup', userController.createUser, (req, res) => {
//   //return res.redirect('../secret'); // ????
// });

// main page;
app.get("/homepage", router); //// name of home page

//global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
