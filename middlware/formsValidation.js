const { body } = require('express-validator');
const db = require('../db/queries');
//passcode yet to validate for admin
const validSignup = [

        body('fullName')
        .trim()
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('name cannot contain numbers or special letters')
        .isLength({ min: 1, max: 20 })
        .withMessage('the name must be in 1 to 20 characters.'),

        body('email')
        .trim()
        .isEmail()
        .withMessage('enter a valid email address')
        .bail()
        .custom(async (value)=>{
                const user = await db.getUserByIdentifier(value);

                if(user){
                        throw new Error('email already exists');
                }
                return true;
        }),
        body('password')
        .trim()
        .isLength({min:5})
        .withMessage('the password should at least be 5 letter'),


        body('confirmPassword')
        .custom((value,{req})=>{
               return value === req.body.password;
        })
        .withMessage('password does not match')



];

module.exports = validSignup;
        
