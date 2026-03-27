const User = require("../models/User.model");

const register = async (req, res) => {
  try {
    // 1. On extrait l'email aussi !
    const { nom, email, password } = req.body; 

    // 2. Vérifier si l'utilisateur existe déjà par nom OU email
    const userExists = await User.findOne({ $or: [{ nom }, { email }] });
    if (userExists) return res.status(400).json({ message: "Nom ou Email déjà utilisé" });

    // 3. On passe l'email au nouveau modèle
    const newUser = new User({ nom, email, password }); 
    await newUser.save();

    console.log("👤 Utilisateur créé dans la collection users !");
    res.status(201).json({ success: true, message: "Utilisateur créé !" });
  } catch (error) {
    console.error("❌ Erreur register:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { nom, password } = req.body;
    const user = await User.findOne({ nom });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Erreur nom/password" });
    }
    res.status(200).json({ success: true, nom: user.nom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };