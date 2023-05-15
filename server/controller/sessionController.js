const Session = require('../model/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
	console.log('----- INSIDE sessionController.isLoggedIn -----');
	Session.findOne({ cookieId: req.cookies.ssid })
		.then((data) => {
			if (data !== null) {
				return next();
			} else
				return next({
					log: "Session doesn't exist",
					status: 401,
					message: { err: "Session doesn't exist" },
				});
		})
		.catch((data) => {
			return next({
				log: 'Error ocuured in sessionController.isLoggedIn.',
				status: 500,
				message: { err: data },
			});
		});
	// Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
	// 	if (err) {
	// 		return next({
	// 			log: 'Error ocuured in sessionController.isLoggedIn.',
	// 			status: 500,
	// 			message: { err: 'An error occured' },
	// 		});
	// 	} else if (!session) {
	// 		return res.sendStatus(401);
	// 	} else {
	// 		return next();
	// 	}
	// });
};

sessionController.startSession = (res, req, next) => {
	console.log('----- INSIDE sessionController.startSession -----');
	Session.create({ cookieId: res.locals.user })
		.then((data) => {
			console.log(data);
			if (data.status === 201) {
				return next();
			} else
				return next({
					log: 'Error ocuured in sessionController.isLoggedIn.',
					status: 500,
					message: { err: 'An error occured' },
				});
		})
		.catch((data) => {
			return next({
				log: 'Error ocuured in sessionController.isLoggedIn.',
				status: 500,
				message: { err: 'An error occured' },
			});
		});
};

// // req.session.destroy
// // req.session = null
// sessionController.finishSession = (res, req, next) => {
//   Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
//     if (err) {
//       return next({
//         log: "Error ocuured in sessionController.finishSession.",
//         status: 500,
//         message: { err: "An error occured" },
//       });
//     } else if (!session) {
//       return res.sendStatus(401);
//     } else {
//       session.cookieId = null;
//       session.save((err) => {
//         if (err) {
//           return next({
//             log: "Error ocuured in sessionController.finishSession.",
//             status: 500,
//             message: { err: "An error occured" },
//           });
//         } else return next();
//       });
//     }
//   });
// };

// sessionController.finishSession = (res, req, next) => {
//   Session.findOneAndDelete({ cookieId: req.cookies.ssid }, (err, session) => {
//     if (err) {
//       return next({
//         log: "Error ocuured in sessionController.finishSession.",
//         status: 500,
//         message: { err: "An error occured" },
//       });
//     } else if (!session) {
//       return res.sendStatus(401);
//     } else {
//       return next();
//     }
//   });
// };

module.exports = sessionController;
