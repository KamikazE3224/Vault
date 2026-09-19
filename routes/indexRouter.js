const {Router} = require('express');
const indexRouter = Router();
const indexController = require('../controller/indexController');
const validateSignup = require('../middlware/formsValidation');
const {isAuth,isGuest} = require('../middlware/authCheck');
const passport = require('passport');
const upload = require("../config/multer");

indexRouter.get('/',isGuest,(req,res)=>{res.render('index');});

indexRouter.get('/sign-up',isGuest,indexController.getSignupForm);
indexRouter.post('/sign-up',validateSignup,indexController.postSignup);

indexRouter.get('/log-in',isGuest,indexController.logInPage);
indexRouter.post('/log-in',indexController.logInUser);
indexRouter.get('/dashboard', isAuth,indexController.loadDashboard);

indexRouter.get('/log-out',indexController.logOutUser);

indexRouter.post(
    '/upload',
    isAuth,
    upload.single('uploadedFile'),
    (req, res) => {
        console.log(req.file);
        res.send('Uploaded!');
    }
);


module.exports = indexRouter;