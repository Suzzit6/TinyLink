const User = require('../model/user')
const {v4: uuidv4} = require ('uuid')
const {SetUser, GetUser} = require('../services/auth')


async function UserSignup(req,res){
   const {name , email , password} = req.body
   try{
   await User.create({
    name,
    email,
    password
    
   })
   
   return res.redirect('/login')
} catch(error){
    return res.render('signup' ,{
        error:"Email Already Registered"
    })
 }
}

async function UserLogin(req,res){
    const {email, password} = req.body
    const userfind = await User.findOne({ email , password })
    if(!userfind){
        return res.render('signup' ,{
            error:"Invalid Email or Password"
        })
        
    }
    const token = SetUser(userfind)
    res.cookie( "uid" ,token)
    return res.redirect('/')
}


module.exports = {
    UserSignup,
    UserLogin
}