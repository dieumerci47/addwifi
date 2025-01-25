const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    mois: {
      type: String,
      required: true,
    },
    annee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Using", userSchema);
