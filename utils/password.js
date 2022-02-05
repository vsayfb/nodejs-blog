import bcrypt from "bcrypt";
import { ErrorHandler } from "./errors.js";

const saltRounds = 10;

export function hashPassword(psw) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(psw, saltRounds, (err, encrypted) => {
      if (err) reject(err);
      else resolve(encrypted);
    });
  });
}

export function comparePassword(psw, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(psw, hash, (err, same) => {
      if (err) reject(err);
      else if (!same) reject(new ErrorHandler("Password was wrong!", 400));
      else resolve(same);
    });
  });
}
