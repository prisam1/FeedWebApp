const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  forgotPasswordOTP,
  setNewPassword,
  user,
  googleCallback,
  getCurrentUser,
  googleLogout,
} = require("../controllers/authController");

const { verifyGoogleToken } = require("../config/googleVerificationToken");
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

//Google for authentication

router.get("/current-user", authMiddleware, getCurrentUser);
router.post("/google/verify-token", verifyGoogleToken);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);
router.get("/googleLogout", googleLogout);

module.exports = router;
