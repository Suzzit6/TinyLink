const URL = require('../model/url');
const mongoose = require('mongoose');
// const  shortid = require('shortid')
const rg = require('rangen');


async function handleGenerateShorturl (req, res){
    
   const body = req.body;
//    const shortid = mongoose.plugin(require('mongoose-nanoid'), 7)
   const shortid =  rg.id();
   
   if(!body.url){
    res.status(400).send("Url Needed")
   }
   try{
   await URL.create({
    shortId:shortid,
    redirectURL:body.url,
    visitHistory:[],
    createdBy : req.user._id
   })
   return res.render("home",
    {
      id: shortid,
      redirectURL:body.url
   }
    )
    
} catch(error){
   console.log(error)
}
}


module.exports = {
    handleGenerateShorturl,
}