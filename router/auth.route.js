const express = require('express');
const router = express.Router();
const {registerCheck} = require('../controllers/authcontroller')
const {register} = require('../middleware/middleware')

router.post("/register", register, registerCheck);


module.exports = router 