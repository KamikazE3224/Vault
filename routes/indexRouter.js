const {Router} = require('express');
const indexRouter = Router();



indexRouter.get('/',(req,res)=>{
        console.log('index router hit');
        //res.render('index');
})

module.exports = indexRouter;