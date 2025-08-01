const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const { RequireAuth } = require("./middlewares/Auth");

const app = express();
require("dotenv").config();

// Connexion à MongoDB
//const URL = "https://addwifi.onrender.com";

mongoose
  .connect(process.env.MONGOADMIN)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Erreur de connexion à MongoDB : " + err));

app.use(express.json());
app.use(cookieParser());
// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://wifiadd.netlify.app",
  "http://192.168.100.254:6600",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.get("/jwtid", RequireAuth, async (req, res) => {
  res.status(200).json(res.locals.userId);
});
app.use("/wifi", userRouter);
app.use("/wifi", adminRouter);

const port = process.env.PORT || 5000;
const IP = "192.168.100.254";
app.listen(port, IP, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});
