const db = require('../db/queries');
const {validationResult}= require('express-validator');
const bcrypt = require('bcrypt');


async function getSignupForm(req,res){
        res.render('signup',{ errors: [] });
}

async function postSignup(req,res){
        const errors = validationResult(req);//errors that come from formValidation

        if(!errors.isEmpty()){
                return res.render('signup',{errors:errors.array()})
        }

        const {fullName,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        await db.postDetails(fullName,email,hashedPassword);
        res.redirect('/log-in');
}
async function uploadFile(req, res) {
    console.log(req.file);

    res.redirect("/dashboard");
}

async function logOutUser(req,res,next){
        res.logout((err)=>{
                if(err){
                        return next(err);
                }
                res.redirect('/');
        })

}

async function logInUser(req, res, next)  {

    console.log("LOGIN FORM:", req.body);

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/log-in',
        failureMessage: true
    })(req, res, next);

}
async function loadDashboard(req, res){
    console.log("DASHBOARD USER:", req.user);
    res.render('dashboard', { user: req.user });
}
async function logInPage(req,res){
        res.render('login')
}

async function postUploadFile(req,res,next){
        if(!req.file){
                return res.status(400).send('No file uploaded or file mismatch');
        }
        
}

module.exports = {
        logInPage,
        loadDashboard,
        logInUser,
        logOutUser,
        getSignupForm,
        postSignup,
        uploadFile
}
