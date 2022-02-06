import jwt from "jsonwebtoken";
import { ErrorHandler } from "./errors.js";

export function generateToken(user) {
  const { _id, role, name } = user;

  return new Promise((resolve, reject) => {
    jwt.sign(
      { user: { _id, role, name } },
      "ssshh very secret",
      (err, encoded) => {
        if (err) reject(err);
        resolve(encoded);
      }
    );
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "ssshh very secret", (err, decoded) => {
      if (err) {
        reject(new ErrorHandler("Invalid Token!", 401));
      }
      resolve();
    });
  });
}
