export default (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next();
      else return res.redirect("/");
    });
  } else next();
};
