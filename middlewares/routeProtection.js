import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(403).send("<h1>Unauthorized!</h1>");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("<h1>Unauthorized!</h1>");
    res.locals.token = token;
    res.locals.user = decoded;
    next();
  });
};
