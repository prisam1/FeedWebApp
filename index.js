require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./src/config/passport");
const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/task");
const postRoutes = require("./src/routes/post");

const app = express();
app.use(
  cors({
    origin: ["https://feedtask.netlify.app", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
// res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
// res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("MongoDb is connected...");
  })
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => console.log("Server running"));
