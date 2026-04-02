const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

// Inscription
router.post('/register', userCtrl.register);

// CONNEXION (C'est cette ligne qui manquait pour enlever le 404 !)
router.post('/login', userCtrl.login);

module.exports = router;