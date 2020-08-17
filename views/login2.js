const express=require('express');
const session= require("session");
const { urlencoded } = require('express');
const app= express();
app.use(urlencoded({extended:false}));
app.set('view engine','ejs');
app.use( session({
    name ='sid',
    secret='sec',
    resave= false,
    saveUninitialize=false

}))
const username=vyshnav ;
const password=123;
const checkLoggedin = (req,res,next)=>{
    if (req.session.username){
       res.redirecrt('/home')
    }
    else{
       next();
    }
}
const protectHome= (req,res,next)=>{
    if (req.session.username){
        next();
    }
    else{
        res.redirecrt("/login")
    }
}
app.get('/login',checkLoggedin,(req,res)=>{
    res.render("login.ejs")
});
app.get('/login',protectHome,(req,res)=>{
    
    res.render("home.ejs")
});