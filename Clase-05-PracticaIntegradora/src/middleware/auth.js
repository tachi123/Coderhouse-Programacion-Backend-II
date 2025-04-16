import jwt from "jsonwebtoken";
import config from "../config/config.js";

const PRIVATE_KEY = config.JWT_PRIVATE_KEY;

export const isLoggedIn = (req, res, next) => {
  const authHeader = req.cookies.currentUser;
  if (!authHeader) {
    return res.render("login");
  }

  let token;
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = authHeader;
  }

  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) {
      return res.render("login");
    }
    req.user = credentials;
    next();
  });
};

export const isLoggedOut = (req, res, next) => {
  const authHeader = req.cookies.currentUser;
  if (authHeader) {
    res.render("current");
  } else {
    next();
  }
};
