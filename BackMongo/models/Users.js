const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    telephone: {
      // Ajout recommandé pour identifier les personnes
      type: String,
      trim: true,
    },
    paiements: {
      // "paiements" au pluriel est plus logique
      type: [
        {
          mois: {
            type: String,
            required: true,
            enum: [
              "janvier",
              "février",
              "mars",
              "avril",
              "mai",
              "juin",
              "juillet",
              "août",
              "septembre",
              "octobre",
              "novembre",
              "décembre",
            ],
            trim: true,
          },
          annee: {
            type: Number,
            required: true,
            min: 2025,
            max: 2100,
          },
          prix: {
            type: Number,
            required: true,
            min: 0,
          },
          payeLe: {
            // Date du paiement
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [], // Par défaut tableau vide plutôt que required
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dm", userSchema);
