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

        const {email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        await db.postDetails(email,hashedPassword);
        res.render('login');
}

module.exports = {
        getSignupForm,
        postSignup
}
