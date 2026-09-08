const {Router} = require('express');
const indexRouter = Router();
const indexController = require('../controller/indexController');
const validateSignup = require('../middlware/formsValidation');

indexRouter.get('/',(req,res)=>{
        res.render('index');
})

indexRouter.get('/sign-up',indexController.getSignupForm);

indexRouter.post('/sign-up',validateSignup,indexController.postSignup)


module.exports = indexRouter;