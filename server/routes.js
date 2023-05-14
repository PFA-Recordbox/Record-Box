const express = require("express");
const cookieParser = require('cookie-parser');
const userController = require('../controller/userController');
const cookieController = require('../controller/cookieController');
const sessionController = require('../controller/characterController');
const router = express.Router();

router.use(cookieParser());

router.get('/',sessionController.isLoggedIn, async (req, res) => {;
try {
    // Assuming you have the user ID stored in the session
    const userId = req.cookies.ssid; 
    // Fetch the user's data from the database
    const user = await User.findOne({ _id: userId });
    // Send the fetched user data as JSON response 
    const userData = user.data
    res.send(userData); 
  } catch (error) {
    console.error('error with checking session for user:', error);
    res.sendStatus(500)
  }
})

router.post('/login',)
router.post('/signup')
