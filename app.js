const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');

const app = express();

const indexRouter = require('./routes/indexRouter');



app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

//---------------BODY PARSER ----------
app.use(express.urlencoded({extended:false}));

//--------------USER FOR EJS ----------
app.use((req,res,next)=>{
        res.locals.user = req.user;
        next();
});
//------------------------------------Routers-----------------------------------------
app.use('/',indexRouter);


app.listen(3000,()=>{
        console.log(('server running on port 3000'));
})