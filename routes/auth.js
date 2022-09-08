import express from "express";
import dotenv from "dotenv";

import {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  restPasswordValidation,
  verifyToken,
} from "../validations/AuthValidation.js";
import {
  signup,
  login,
  forgotPassword,
  resetpassword,
  verifyEmail,
} from "../controllers/AuthController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("auth route working");
});

router.post("/signup", signupValidation(), signup);
router.post("/login", loginValidation(), login);
router.post("/verifyEmail/:token", verifyEmail);
router.post("/forgotPassword", forgotPasswordValidation(), forgotPassword);
router.post("/resetPassword", restPasswordValidation(), resetpassword);
router.post("/verifyToken", verifyToken);

export const authRouter = router;
