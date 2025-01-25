const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  /* user: "dieumerci",
  password: "Florencekianou@06", */
  user: process.env.USERMYSQL,
  password: process.env.USERPASSWORD,
  database: "wifi",
});

db.connect((err) => {
  if (err) {
    console.log(`connection à la basee de données impossible ${err}`);
  } else {
    console.log(`connection à la base de données réussi`);
  }
});

module.exports = db;
