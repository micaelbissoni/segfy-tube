import jwt from "jsonwebtoken";
import settings from "../settings";

const signOptions = {
  expiresIn: "12h",
  algorithm: "RS256"
};

const verifyJwt = ({ token }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, settings.jwtSecret, signOptions, (err, payload) => {
      resolve(payload);
    });
  });
};

export default verifyJwt;
