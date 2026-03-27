const express = require("express");
const router = express.Router();

// On importe les fonctions depuis le controller
const { saveResultat, getAllResultats } = require("../controllers/resultat.controller");

// --- Route : Sauvegarde les resultats ---
router.post("/save", saveResultat);

// --- Route : Recupere TOUS les resultats ---
router.get("/", getAllResultats);

// --- Route : Recupere le dernier résultat d'un utilisateur précis ---
router.get("/user/:pseudo", async (req, res) => {
    try {
        const ResultatQuiz = require("../models/ResultatQuiz.model");
        const data = await ResultatQuiz.findOne({ pseudo: req.params.pseudo }).sort({ createdAt: -1 });
        
        if (!data) {
            return res.status(404).json({ message: "Aucun résultat pour ce pseudo" });
        }
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});

// IMPORTANT : On exporte le router à la fin
module.exports = router;