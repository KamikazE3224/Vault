const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { prisma } = require('./lib/prisma');

const app = express();

const indexRouter = require('./routes/indexRouter');

//---------------VIEWS---------------------------
app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

//---------------SESSION---------------------------
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

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