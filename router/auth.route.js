const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authcontroller')
const {checkLogin} = require('../middleware/middleware')

router.post("/login", checkLogin, login);


module.exports = router 