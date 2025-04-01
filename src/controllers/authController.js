require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setAuthCookies } = require("../helper/auth.helper");
const { generateRandomSixDigit } = require("../helper/generateOtp.helper");
const { sendMail } = require("../utils/nodemailer");

//Create User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

//Log in User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const isMobile = req.headers["user-agent"].includes("Mobi");
  let access_token = null;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set token in cookies for desktop, return token for mobile
    setAuthCookies(res, token, isMobile);

    //access token only send for mobile
    if (isMobile) {
      access_token = token;
    }

    const userData = { name: user.name, email: user.email };

    res
      .status(200)
      .json({ message: "Login successful", userData, access_token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//logout User
exports.logout = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "Logged out successfully" });
};

//get User
exports.user = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "UnAuthorized" });
  }

  res.status(200).json(user);
};

//forgot Password -> otp will be send
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate a new 6 digit OTP
    const otp = generateRandomSixDigit();

    // Update the user with the new OTP
    user.otp = otp;
    await user.save();

    // Send the OTP via email
    await sendMail(email, otp);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
};

//forgot Password OTP confirmation
exports.forgotPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if the OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP fields after verification
    user.otp = null;
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in forgotPasswordOTP:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
};

//set new password
exports.setNewPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update Password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password Changed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
};

// Redirect to Google login
exports.googleLogin = (req, res,next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

// Handle Google callback
exports.googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const { id, displayName, emails } = req.user;
    const isMobile = req.headers["user-agent"]?.includes("Mobi") || false;
    const email = emails[0].value;

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(id, 10);  
      user = await User.create({
        googleId: id,
        name: displayName,
        email,
        password: hashedPassword, 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, googleId: user.googleId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    setAuthCookies(res, token, isMobile);

    // Redirect user to frontend with token
    res.redirect(
      `${process.env.FRONT_URL}/home?name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(email)}`
    );
  } catch (err) {
    console.error("Google OAuth Callback Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get the current user for google Oauth
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "Not Authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Logout the user
exports.googleLogout = async (req, res) => {
  try {
    await req.logout();
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};
