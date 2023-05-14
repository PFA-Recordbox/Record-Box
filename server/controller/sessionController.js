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

module.exports = sessionController;
