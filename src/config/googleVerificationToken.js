const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { setAuthCookies } = require("../helper/auth.helper");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(sub, 10);
      user = await User.create({
        googleId: sub,
        email,
        name,
        password: hashedPassword,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isMobile = req.headers["user-agent"].includes("Mobi");
    setAuthCookies(res, token, isMobile);

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Google token verify error:", err);
    res.status(401).json({ error: "Invalid Google Token" });
  }
};
