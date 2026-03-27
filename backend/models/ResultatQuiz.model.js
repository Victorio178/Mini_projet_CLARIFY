const mongoose = require("mongoose");

// Ce modele represente les resultats du quiz d'un utilisateur
// Il contient le profil rempli dans Form.jsx ET les scores du quiz
const resultatSchema = new mongoose.Schema(
  {
    // --- Informations du profil (viennent de Form.jsx) ---
    pseudo: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    sexe: {
      type: String,
    },
    situation: {
      type: String,
    },
    sommeil: {
      type: String,
    },
    sport: {
      type: String,
    },
    ecrans: {
      type: String,
    },

    // --- Scores du quiz (viennent de Question.jsx) ---
    // Chaque domaine a un score entre 3 (tres bien) et 9 (tres stresse)
    scores: {
      mental: { type: Number, default: 0 },
      physique: { type: Number, default: 0 },
      emotion: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
    },

    // La date en format lisible, ex: "26/03/2026"
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose va creer une collection "resultatquizs" dans MongoDB
module.exports = mongoose.model("ResultatQuiz", resultatSchema);
