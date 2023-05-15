const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const cookieParser = require('cookie-parser');
//const userController = require("./controller/userController");
const router = require('./routes.js');

// MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGODB_URI);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//remember to add endpoint
app.use('/index.html', express.static(path.resolve(__dirname, './index.html')));

// entry point for client users
app.use('/', router);

// signup
// app.post('/signup', router);
// (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, "../client/index.html")); //// ??? index html ???
// });

// login
// app.post('/login', router);

//logout
app.post('/logout', router);

//add data
app.post('/add', router);

//delete data
app.post('/delete', router);

// app.post('/signup', userController.createUser, (req, res) => {
//   //return res.redirect('../secret'); // ????
// });

// main page;
// app.get("/homepage", router); //// name of home page

//global error handler
app.use((err, req, res, next) => {
	console.log('----- INSIDE GLOBAL ERROR HANDLER -----');
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
