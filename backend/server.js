const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// --- Middlewares ---
// cors() permet au frontend (port 5173) de parler au backend (port 5000)
app.use(cors());
// express.json() permet de lire le body des requetes POST au format JSON
app.use(express.json());

// --- Connexion a MongoDB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connecte a MongoDB avec succes !");
  })
  .catch((err) => {
    console.log("Erreur de connexion MongoDB :", err.message);
  });

// --- Importation des routes ---
const userRoutes = require("./routes/user.routes");
const resultatRoutes = require("./routes/resultat.routes");

// --- Branchement des routes ---
// Toutes les routes qui commencent par /api/users vont dans user.routes.js
app.use("/api/users", userRoutes);
// Toutes les routes qui commencent par /api/resultats vont dans resultat.routes.js
app.use("/api/resultats", resultatRoutes);

// --- Route de test ---
app.get("/", (req, res) => {
  res.send("Backend CLARIFY fonctionne !");
});

// --- Demarrage du serveur ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("Serveur demarre sur le port " + PORT);
});

server.on('error', (err) => {
  console.error('Erreur démarrage serveur:', err);
  process.exit(1);
});
