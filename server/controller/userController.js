const User = require('../model/userModel');

const userController = {};
userController.createUser = (req, res, next) => {
	console.log('----- INSIDE userController.createUser -----');
	const { userId, userPassword } = req.body;
	if (!userId || !userPassword)
		return next({
			log: 'Missing username or password in userController.createUser',
			status: 400,
			message: { err: 'An error occured' },
		});

	User.create({ userId, userPassword }, (err, user) => {
		if (err) {
			return next({
				log: 'Error ocuured in userController.verifyUser.',
				status: 500,
				message: { err: 'An error occured' },
			});
		} else {
			res.locals.user = user.id;
			return next();
		}
	});
};

userController.verifyUser = (req, res, next) => {
	console.log('----- INSIDE userController.verifyUser -----');
	const { userId, userPassword } = req.body;
	if (!userId || !userPassword)
		return next({
			log: 'Missing username or password in userController.verifyUser',
			status: 400,
			message: { err: 'An error occured' },
		});
	User.findOne({ userId }).then((data) => {
		if (data !== null) {
			bcrypt.compare(userPassword, userId.userPassword).then((result) => {
				if (result) {
					res.locals.user = data._id;
					return next();
				}
			});
		}
	});
	// User.findOne({ userId }, (err, user) => {
	// 	if (err) {
	// 		return next({
	// 			log: 'Error ocuured in userController.verifyUser.',
	// 			status: 500,
	// 			message: { err: 'An error occured' },
	// 		});
	// 	} else if (!user) {
	// 		res.sendStatus(404);
	// 	} else {
	// 		bcrypt
	// 			.compare(userPassword, userId.userPassword)
	// 			.then((result) => {
	// 				if (result) {
	// 					res.locals.user = user.id;
	// 					return next();
	// 					// res.sendStatus(404);
	// 				}
	// 				//   else {
	// 				//     res.sendStatus(404);
	// 				//   }
	// 			})
	// 			.catch((err) => {
	// 				return next({
	// 					log: 'Error ocuured in userController.verifyUser.',
	// 					status: 500,
	// 					message: { err: 'An error occured' },
	// 				});
	// 			});
	// 	}
	// });
};

// userController.updateData = async (req, res, next) => {

//   const { website, userId, password } = req.params;
//   const { website, newUserId, newPassword} = req.body;

//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return next({
//         log: "Error ocuured in userController.verifyUser.",
//         status: 500,
//         message: { err: "An error occured" },
//       });
//     } else if (!user) {
//       res.sendStatus(404);
//     } else {

//       try {
//         db.collection = await db.collection.findOneAndUpdate(
//           { website },
//           {website: website},
//           { userId },
//           { userId: newUserId},
//           { password },
//           { password: newPassword },
//           { new: true }
//         );
//         return next();
//       } catch (err) {
//         return next({
//           log: `Error in userController.updateData: ${err.message}`,
//           status: 400,
//           message: { err: "Error in userController.updateData" },
//         });
//       }
//     }
//   });
// }

// //  may be need to be used  findByIdAndDelete
// userController.deleteData = async (req, res, next) => {

//   const { website, userId, password } = req.params; // req.body
//   const { website, username, password} = req.body;

//   User.findOneDelete({ username }, (err, user) => {
//     if (err) {
//       return next({
//         log: "Error ocuured in userController.verifyUser.",
//         status: 500,
//         message: { err: "An error occured" },
//       });
//     } else if (!user) {
//       res.sendStatus(404);
//     } else {
// // what will be deleted? only user data?
//       try {
//         db.collection = await db.collection.findOneAndDelete(
//           {
//             // website: ,
//             // username: ,
//             // password: ,
//           }
//         );
//         return next();
//       } catch (err) {
//         return next({
//           log: `Error in userController.deleteData: ${err.message}`,
//           status: 400,
//           message: { err: "Error in userController.deleteData" },
//         });
//       }
//     }
//   });
// }

// // userController.updateData = async (req, res, next) => {
// //   // website: { type: String, required: true},
// //   // userId: { type: String, required: true},
// //   // password: { type: String, required: true},

// //   const { website, userId, password } = req.params;
// //   const { website, newUserId, newPassword} = req.body;

// //   try {
// //     db.collection = await db.collection.findOneAndUpdate(
// //       { website },
// //       {website: website},
// //       { userId },
// //       { userId: newUserId},
// //       { password },
// //       { password: newPassword },
// //       { new: true }
// //     );
// //     return next();
// //   } catch (err) {
// //     return next({
// //       log: `Error in userController.updateData: ${err.message}`,
// //       status: 400,
// //       message: { err: "Error in userController.updateData" },
// //     });
// //   }
// // }

// // userController.deleteData = async (req, res, next) => {
// //   // website: { type: String, required: true},
// //   // userId: { type: String, required: true},
// //   // password: { type: String, required: true},

// //   const { website, userId, password } = req.params;
// //   const { website, newUserId, newPassword} = req.body;

// //   try {
// //     db.collection = await db.collection.findOneAndDelete(
// //       {
// //       website: ,
// //       userId: ,
// //       password: ,
// //       }
// //     );
// //     return next();
// //   } catch (err) {
// //     return next({
// //       log: `Error in userController.deleteData: ${err.message}`,
// //       status: 400,
// //       message: { err: "Error in userController.deleteData" },
// //     });
// //   }
// // }

// // version 3;

// // const dbName = 'me'; //yourDatabaseNa

// // Connect to the MongoDB server
// // MongoClient.connect(url, function(err, client) {
// //   if (err) {
// //     console.log('Error occurred while connecting to MongoDB', err);
// //     return;
// //   }

// //   // Select the database
// //   const db = client.db(dbName);

// //   // Select the collection
// //   const collection = db.collection('yourCollectionName');

// //   // Define the query criteria
// //   const query = { key: 'value' };

// //   // Find and delete the document matching the query
// //   collection.findOneAndDelete(query, function(err, result) {
// //     if (err) {
// //       console.log('Error occurred while deleting document', err);
// //       return;
// //     }

// //     if (result.value) {
// //       console.log('Deleted document:', result.value);
// //     } else {
// //       console.log('No document found matching the query.');
// //     }

// //     // Close the MongoDB connection
// //     client.close();
// //   });
// // });

module.exports = userController;
