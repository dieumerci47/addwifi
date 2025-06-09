const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 24 * 3600 * 1000; // 24 heures en millisecondes
let CreateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};
module.exports.signup = (req, res) => {
  const admin = new Admin({ ...req.body });
  console.log({ ...req.body });

  admin
    .save()
    .then((user) => {
      res.status(200).json({ message: "Succès", id: user._id });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports.signin = (req, res, next) => {
  Admin.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(403).json({ errors: "password/email Incorrect" });
      // res.status(200).json(user);
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(403).json({ errors: "password/email Incorrect" });
          } else {
            const token = CreateToken(user._id);
            res.cookie("jwt", token, {
              httpOnly: true,
              secure: true,
              /*  secure: "production",
                sameSite: "Lax", */
              sameSite: "None",
              maxAge: maxAge,
              credentials: true,
              allowedHeaders: ["Content-Type", "Authorization"],
              path: "/",
            });
            res.status(200).json({ message: "token crée", _id: user._id });
          }
        })
        .catch((err) => {
          res.status(400).json({ errors: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ errors: err.message });
    });
};
module.exports.logout = (req, res) => {
  console.log("Utilisateur deconnecté");

  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.status(200).json({ message: "Utilisateur deconnecté" });
};
