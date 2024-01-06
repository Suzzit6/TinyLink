const express = require('express')
const User = require("../model/user")

const  { UserSignup , UserLogin} = require('../controller/user')
const router = express.Router()

router.post('/', UserSignup )
router.post('/login', UserLogin )

module.exports = router