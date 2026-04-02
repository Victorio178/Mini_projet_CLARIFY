const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.log("❌ Erreur MongoDB :", err.message));

// Importation des routes
const userRoutes = require("./routes/user.routes");
const resultatRoutes = require("./routes/resultat.routes");

// Branchement (Prefixes)
app.use("/api/users", userRoutes); // Les routes seront /api/users/register et /api/users/login
app.use("/api/resultats", resultatRoutes);

app.get("/", (req, res) => {
  res.send("Backend CLARIFY fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur : http://localhost:${PORT}`);
});