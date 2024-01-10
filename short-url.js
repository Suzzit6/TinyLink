const express = require("express")
const app = express()
const fs = require('fs')
const mongoose = require('mongoose')
const URL = require('./model/url')
const path = require('path')
const { Authorization , RestrictTo } = require('./Middlewares/auth')

const port = 5000
const { connectMongoDB  } = require('./connection')

const urlroute = require('./routes/url')
const Staticroute = require('./routes/StaticRoute')
const userroute = require('./routes/user')
app.use(express.json())


connectMongoDB('mongodb://localhost:27017/Short-url').then((value)=>{
  console.log("server connected")
}).catch((err)=>{
    console.log(err)
})
app.use(express.urlencoded({extended:false}))
const cookieParser = require('cookie-parser')
app.use( express.static(path.resolve('./public')));

app.use(cookieParser())
app.use(Authorization)

app.set("view engine" , "ejs") 
app.set('views' ,path.resolve('./view'))

app.use('/url', RestrictTo(["NORMAL",'ADMIN']) , urlroute )
app.use('/', Staticroute)
app.use('/user' , userroute)


app.get('/', async(req,res)=>{
    return res.render('home')
})

app.get('/:shortId' , async (req,res)=>{
    try{
    const shortId = req.params.shortId;
     
    const entry =  await URL.findOneAndUpdate(
        {
         shortId
        },
        {
          $push:{
            visitHistory:{
                timestamp : Date.now()
            }
          }
        }
     )
     if(entry){
     return res.redirect(entry.redirectURL)
    } else{
        return res.status(404).send('URL incorrect')
    }
    } catch {
        return res.send('Internal server error')
    }

})

app.listen(port,()=> console.log(`Server Started At ${port}`))