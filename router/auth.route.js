const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/authcontroller')
const {loginMiddleware} = require('../middleware/loginMiddleware')

router.post("/login", loginMiddleware, login);
router.post("/register", register);


module.exports = router 