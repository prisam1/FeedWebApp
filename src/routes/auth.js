const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  forgotPasswordOTP,
  setNewPassword,
  user,
  googleLogin,
  googleCallback,
  getCurrentUser,
  googleLogout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("passport");

const router = express.Router();

//------------------------------------
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password-otp", forgotPasswordOTP);
router.post("/set-password", setNewPassword);
router.get("/user", authMiddleware, user);

// Redirect to Google for authentication
router.get("/google", googleLogin);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  googleCallback
);

module.exports = router;
