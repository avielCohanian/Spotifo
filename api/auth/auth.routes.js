const express = require('express');
const { login, signup, logout, signupGoogle, loginGoogle } = require('./auth.controller');

const router = express.Router();

router.post('/signupGoogle', signupGoogle);
router.post('/loginGoogle', loginGoogle);
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

module.exports = router;
