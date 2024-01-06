const URL = require('../model/url')
const express = require("express")
const router = express.Router()
const{ handleGenerateShorturl } = require('../controller/url')

router.post('/', handleGenerateShorturl)

module.exports =  router;