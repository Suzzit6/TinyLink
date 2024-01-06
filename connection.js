// const URL = require('../model/user')
const mongoose = require('mongoose')

async function connectMongoDB(url){
   mongoose.connect(url)
}
module.exports = {
    connectMongoDB
}