const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

// Cette route doit correspondre à l'appel Axios du Frontend
router.post('/register', userCtrl.register);

module.exports = router;