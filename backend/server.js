const express = require("express");
const db = require("./config");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypyt = require("bcrypt");
require("dotenv").config();

const ports = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.post("/wifi/user", (req, res) => {
  const { mois, annee } = req.body;

  db.query(
    "SELECT * FROM user WHERE mois=? AND annee=?",
    [mois, annee],
    (err, results) => {
      if (err) return res.status(400).json(err);
      else {
        res.status(200).json(results);
      }
    }
  );
});
app.get("/wifi/user/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM user WHERE id =?`, [id], (err, results) => {
    if (err) return res.status(400).json(err);
    else {
      res.status(200).json(results);
    }
  });
});
app.post("/wifi/admin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT * FROM admin WHERE email =?`, [email], (err, results) => {
    if (err) return res.status(400).json(err);
    else {
      if (results.length == 0)
        return res.status(403).json({ err: "Admin not found" });
      else {
        if (results[0].password != password) {
          return res.status(401).json({ response: false });
        } else {
          res.status(200).json({ response: true });
        }
      }
    }
  });
});
app.put("/wifi/user/:id", (req, res) => {
  const { prix, id } = req.body;
  db.query(`UPDATE user SET prix=? WHERE id =?`, [prix, id], (err, results) => {
    if (err) return res.status(400).json(err);
    else {
      res.status(200).json(results);
    }
  });
});
app.post("/wifi/adduser", (req, res) => {
  const { nom, prix, mois, annee } = req.body;
  db.query(
    `INSERT INTO user (nom,prix,mois,annee) VALUES (?,?,?,?)`,
    [nom, prix, mois, annee],
    (err, results) => {
      if (err) return res.status(400).json(err);
      else {
        res.status(200).json({ message: "Donnée enreigstré" });
      }
    }
  );
});
app.listen(ports, () => {
  console.log(`le server est lancé sur le port ${ports}`);
});
