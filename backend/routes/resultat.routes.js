const express = require("express");
const router = express.Router();

// Vérifie bien que les noms correspondent exactement aux exports du controller
const { saveResultat, getAllResultats } = require("../controllers/resultat.controller");

// --- Route : Sauvegarde ---
router.post("/save", saveResultat);

// --- Route : Recupere TOUS les resultats ---
// Si getAllResultats n'est pas défini au-dessus, c'est ici que ça plante
router.get("/", getAllResultats);

// --- Route : Recupere le dernier résultat d'un utilisateur ---
router.get("/user/:pseudo", async (req, res) => {
    try {
        const ResultatQuiz = require("../models/ResultatQuiz.model");
        const data = await ResultatQuiz.findOne({ pseudo: req.params.pseudo }).sort({ createdAt: -1 });
        if (!data) return res.status(404).json({ message: "Aucun résultat trouvé" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});

module.exports = router;