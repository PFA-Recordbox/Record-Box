const Session = require("../model/sessionModel");

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      return next({
        log: "Error ocuured in sessionController.isLoggedIn.",
        status: 500,
        message: { err: "An error occured" },
      });
    } else if (!session) {
      return res.sendStatus(401);
    } else {
      return next();
    }
  });
};

sessionController.startSession = (res, req, next) => {
  Session.create({ cookieId: res.locals.user }, (err, session) => {
    if (err)
      return next({
        log: "Error ocuured in sessionController.isLoggedIn.",
        status: 500,
        message: { err: "An error occured" },
      });
    else return next();
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
