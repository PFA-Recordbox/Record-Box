const User = require("../model/userModel");

const userController = {};
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      log: "Missing username or password in userController.createUser",
      status: 400,
      message: { err: "An error occured" },
    });

  User.create({ username, password }, (err, user) => {
    if (err) {
      return next({
        log: "Error ocuured in userController.verifyUser.",
        status: 500,
        message: { err: "An error occured" },
      });
    } else {
      res.locals.user = user.id;
      return next();
    }
  });
};

userController.veryfyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      log: "Missing username or password in userController.veryfyUser",
      status: 400,
      message: { err: "An error occured" },
    });
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next({
        log: "Error ocuured in userController.verifyUser.",
        status: 500,
        message: { err: "An error occured" },
      });
    } else if (!user) {
      res.sendStatus(404);
    } else {
      bcrypt
        .compare(password, username.password)
        .then((result) => {
          if (result) {
            res.locals.user = user.id;
            return next();
            res.sendStatus(404);
          }
          //   else {
          //     res.sendStatus(404);
          //   }
        })
        .catch((err) => {
          return next({
            log: "Error ocuured in userController.verifyUser.",
            status: 500,
            message: { err: "An error occured" },
          });
        });
    }
  });
};

module.exports = userController;
