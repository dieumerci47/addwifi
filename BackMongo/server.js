const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Admin = require("./models/Admin");

const app = express();
require("dotenv").config();

// Connexion à MongoDB

mongoose
  .connect(process.env.MONGOADMIN)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Erreur de connexion à MongoDB : " + err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.post("/wifi/user", async (req, res) => {
  try {
    //  const { mois, annee } = req.body;
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/wifi/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/wifi/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(403).json({ err: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ response: false });
    }

    res.status(200).json({ response: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/wifi/user/:id", async (req, res) => {
  try {
    const { prix } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { prix },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/wifi/adduser", async (req, res) => {
  try {
    const { nom, prix, mois, annee } = req.body;
    const newUser = await User.create({ nom, prix, mois, annee });
    res.status(200).json({ message: "Donnée enregistrée", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});
