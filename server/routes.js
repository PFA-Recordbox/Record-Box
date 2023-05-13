const express = require("express");
const userController = require('../controller/userController');
const cookieController = require('../controller/cookieController');
const sessionController = require('../controller/characterController');
const router = express.Router();

router.get('/',sessionController.isLoggedIn);
try {
    const userId = req.session.userId; // Assuming you have the user ID stored in the session
    const userData = await Data.findOne({ userId }); // Fetch the user's data from the database

    res.json(userData); // Send the fetched user data as JSON response
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});