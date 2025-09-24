const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/authcontroller')
const {checkLogin, registerCheck } = require('../middleware/middleware')

router.post("/login", checkLogin, login);
router.post("/register", registerCheck, register);


module.exports = router 