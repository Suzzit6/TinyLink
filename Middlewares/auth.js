const { GetUser } = require('../services/auth')

async function Authorization(req,res,next){
   const useruid = req.cookies?.uid
   req.user = null
   if(!useruid) {
    return next()
   }
   const user = GetUser(useruid)
   if(!user)  {
    return next()
   }
   req.user = user
   return next() 
}
function RestrictTo( roles = []){
   return function ( req, res , next){
       if(!req.user) return res.redirect("/welcome")
       if(!roles.includes(req.user.role)) return res.end('Unauthorized')
       return next()
   }
}


module.exports = {
    Authorization,
    RestrictTo,
}