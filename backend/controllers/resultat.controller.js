const ResultatQuiz = require("../models/ResultatQuiz.model");

exports.saveResultat = async (req, res) => {
  console.log("📥 Données reçues du Front:", req.body);
  try {
    const newResultat = new ResultatQuiz(req.body);
    await newResultat.save();
    console.log("✅ Sauvegarde réussie dans MongoDB !");
    
    res.status(201).json({ 
      success: true, 
      message: "Résultat sauvegardé avec succès !", 
      resultat: newResultat 
    });
  } catch (error) {
    console.error("❌ Erreur MongoDB:", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
};

exports.getAllResultats = async (req, res) => {
  try {
    const resultats = await ResultatQuiz.find().sort({ createdAt: -1 });
    res.status(200).json(resultats);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};