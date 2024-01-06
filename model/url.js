const mongoose = require('mongoose')

const urlschema = new mongoose.Schema({
   shortId:{
    type:String,
    require:true,
    unique:true
   },
   redirectURL:{
    type:String,
    require:true
   },
   visitHistory:[{
      timestamp: {type:Number}
   }],
   createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
  }
},
{ timestamp:true }
) 
const URL = mongoose.model('url-list', urlschema)
module.exports = URL