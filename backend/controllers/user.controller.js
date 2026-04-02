const User = require("../models/User.model");

// Inscription
const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body; 

    const userExists = await User.findOne({ $or: [{ nom }, { email }] });
    if (userExists) return res.status(400).json({ message: "Nom ou Email déjà utilisé" });

    const newUser = new User({ nom, email, password }); 
    await newUser.save();

    console.log("👤 Utilisateur créé :", nom);
    res.status(201).json({ success: true, message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { nom, password } = req.body;
    
    // On cherche l'utilisateur (nettoyage des espaces avec trim)
    const user = await User.findOne({ nom: nom.trim() });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Nom ou mot de passe incorrect" });
    }

    console.log("✅ Connexion réussie pour :", user.nom);
    // On renvoie success: true et le nom pour le localStorage
    res.status(200).json({ success: true, nom: user.nom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };