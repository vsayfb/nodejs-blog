import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.locals.token = undefined;
        res.locals.user = undefined;
        next();
      } else {
        res.locals.token = token;
        res.locals.user = decoded;
        next();
      }
    });
  } else next();
};
