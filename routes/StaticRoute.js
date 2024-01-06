const express = require('express')
const URL = require('../model/url')
const {  RestrictTo } = require('../Middlewares/auth') 

const router = express.Router()
router.get('/admin/urls' , RestrictTo("ADMIN"), async(req,res) =>{
    const urls = await URL.find({})
    return res.render("home",{
        urls
    })
}) 

router.get( '/',RestrictTo(["NORMAL","ADMIN"]) ,  async(req,res)=>{
    const urls = await URL.find({createdBy: req.user._id})
    return res.render("home",{
        urls
    })
})
router.get('/signup' , async(req,res)=>{
    return res.render('signup')
})
router.get('/login' , async(req,res)=>{
    return res.render('login')
})

module.exports = router