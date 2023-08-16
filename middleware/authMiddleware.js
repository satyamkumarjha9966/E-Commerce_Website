import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

// Protected Route Token Based
export const requireSignin = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;

    next();
  } catch (error) {
    console.log("Error in Token Compare Middleware > " + error);
  }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error in Admin Access Middleware > " + error);
    res.status(401).send({
      success: false,
      message: "Error in Admin Access Middleware",
      error,
    });
  }
};
