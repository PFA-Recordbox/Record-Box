const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  // Calculate the expiration time, e.g., 30 from the current time
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  res.cookie("ssid", res.locals.user, { httpOnly: true, expires: expirationDate});
  return next;
};

module.exports = cookieController;
