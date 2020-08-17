
const express= require("express");
const path =require("path");
const { log } = require("console");
const session= require("express-session");
const { nextTick } = require("process");

const app= express();
app.use(express.urlencoded({extended:false}))
//const ejs= require("ejs");
//app.use('/',express.static("views"));
//app.set('views',path.join(__dirname,'views'));
app.set("view engine ",'ejs');
app.use(session ({
    name : 'sid',
    secret: 'sec',
    resave: false,
    saveUninitialized: false
}));
const username="Vyshnav";
const password= 123;
const checkloggedin = (req,res,next)=>{
    if(req.session.username){
        res.redirect('/home');
    }else{
        next();
    }gin
}
const protectHome= (req,res,next) =>{
    if(req.session.username){
        next();
    }else{
        res.redirect("/login")
    }

}

app.get('/login',checkloggedin,(req,res)=>{ 
     res.render('login.ejs');
});
app.get('/home',protectHome,(req,res)=>{ 
    res.render('home.ejs',{name : req.session.username});
});
app.post('/login',(req,res)=>{
    if(username==req.body.username&& password==req.body.password){
        req.session.username = req.body.username;
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
})
app.post ("/logout",(req ,res)=>{
    res.clearCookie("sid");
    req.session.destroy();
    res.redirect("/login")
})



const PORT =  3001;

app.listen(PORT);
