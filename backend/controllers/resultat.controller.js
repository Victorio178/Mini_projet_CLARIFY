const ResultatQuiz = require("../models/ResultatQuiz.model");

// FONCTION 1 : Sauvegarder
exports.saveResultat = async (req, res) => {
    try {
        const nouveauBilan = new ResultatQuiz(req.body);
        await nouveauBilan.save();
        res.status(201).json({ success: true, message: "Bilan enregistré !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// FONCTION 2 : Tout récupérer (C'est celle-ci qui doit manquer !)
exports.getAllResultats = async (req, res) => {
    try {
        const data = await ResultatQuiz.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};