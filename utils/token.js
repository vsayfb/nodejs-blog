import jwt from "jsonwebtoken";
import { ErrorHandler } from "./errors.js";
import config from "../config/app.js";

export function generateToken(user) {
  const { _id, role, displayName, lastLogin, createdAt } = user;

  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id, role, displayName, lastLogin, createdAt },
      config.jwtSecret,
      (err, encoded) => {
        if (err) reject(err);
        resolve(encoded);
      }
    );
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        reject(new ErrorHandler("Invalid Token!", 401));
      }
      resolve(decoded);
    });
  });
}
