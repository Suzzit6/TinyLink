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
    const user = req.user
    return res.render("home",{
        urls,
        user
    })  
})
 
router.get('/signup' , async(req,res)=>{
    return res.render('signup')
})
router.get('/login' , async(req,res)=>{
    return res.render('login')
})

router.get('/welcome', async(req,res)=>{
    return res.render('landing') 
})
router.get('/logout' , async(req,res)=>{
    return res.clearCookie("uid").redirect("/welcome")
})

module.exports = router 