function isGuest(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).send("Forbidden: Admins only.");
}

module.exports = {
  isGuest,
  isAuth,
  isAdmin, 
};