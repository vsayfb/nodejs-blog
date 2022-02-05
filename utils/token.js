import jwt from "jsonwebtoken";

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
