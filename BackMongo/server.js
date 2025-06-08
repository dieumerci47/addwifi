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
const LOCAL = "http://localhost:5173";

mongoose
  .connect(process.env.MONGOADMIN)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Erreur de connexion à MongoDB : " + err));

app.use(express.json());
app.use(cookieParser());
// Middleware
const corsOptions = {
  //origin: "http://localhost:5173", // Remplacez par le domaine de votre front-end
  // origin: "http://127.0.0.1:3000", // Remplacez par le domaine de votre front-end
  /*  origin: [
    // Remplacez par le domaine de votre front-end
    "http://localhost:5173", // Vite dev server
    "http://127.0.0.1:5173",
  ], */
  credentials: true,
  origin: "http://localhost:5173", // Utilisez une seule valeur
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Routes
app.get("/jwtid", RequireAuth, async (req, res) => {
  console.log("jwtid : " + res.locals.userId);
  res.status(200).json(res.locals.userId);
});
app.use("/wifi", userRouter);
app.use("/wifi", adminRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
  /*  setInterval(() => {
    console.log("Le serveur est lancé sur le port " + port);
  }, 100000); */
});
