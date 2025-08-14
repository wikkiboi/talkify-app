import { ErrorRequestHandler } from "./types";

const authErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 401 || err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  if (err.name === "TokenExpiredError") {
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }

  if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json({ message: "Authentication failed due to invalid token." });
  }

  if (err.code === 11000) {
    // MongoDB duplicate key error
    return res
      .status(400)
      .json({ message: "Username or email already exists." });
  }

  if (err.status === 400) {
    return res.status(400).json({ message: err.message || "Invalid request." });
  }

  next(err);
};

export default authErrorHandler;
