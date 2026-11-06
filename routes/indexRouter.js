const {Router} = require('express');
const indexRouter = Router();
const indexController = require('../controller/indexController');


indexRouter.get('/',(req,res)=>{
        console.log('index router hit');
        res.render('index');
})
indexRouter.get('/signup',indexController.signUpForm);
indexRouter.post('/signup',indexController.createUser);

module.exports = indexRouter;