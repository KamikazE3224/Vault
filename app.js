const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');
//const pgSession = require('connect-pg-simple')(expressSession);
const passport = require('passport');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');

const app = express();

//Router imports after this
const indexRouter = require('./routes/indexRouter'); 

require('dotenv/config');
const pgPool = require('./db/pool');
const { prisma } = require('./lib/prisma');

app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

// -------------------------------- SESSION----------------------------------------------

app.use(
        expressSession({
                cookie:{
                        maxAge: 7*24*60*60*1000
                },
                secret: process.env.SECRET,
                resave:true,
                saveUninitialized: true,
                store: new PrismaSessionStore(
                        prisma,
                        {
                                checkPeriod: 2*60*1000,
                                dbRecordIdIsSessionId: true,
                                dbRecordIdFunction: undefined,
                        }
                )
        })
)

//----------------PASSPORT-------------
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

//---------------BODY PARSER ----------
app.use(express.urlencoded({extended:false}));

//--------------USER FOR EJS ----------
app.use((req,res,next)=>{
        res.locals.user = req.user;
        next();
});

//---------------ROUTES----------------
app.use('/',indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
})