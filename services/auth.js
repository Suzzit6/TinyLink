
const jwt = require('jsonwebtoken')
const secretkey = 'sujit@..-ap'

function SetUser(user){
   return jwt.sign({
    _id:user._id ,
    email:user.email,
    role:user.role
}, secretkey)
}

 function GetUser(token){
    if(!token) return null
    return jwt.verify(token, secretkey)
}

module.exports = {
    SetUser,
    GetUser,
}