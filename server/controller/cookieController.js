const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.user, { httpOnly: true });
  return next;
};

module.exports = cookieController;
