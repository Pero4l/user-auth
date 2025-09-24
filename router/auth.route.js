const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/authcontroller')
const {registerMiddleware} = require('../middleware/regMiddleware')

router.post("/login", login);
router.post("/register", registerMiddleware, register);


module.exports = router 