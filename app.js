const path = require('node:path');
const express = require('express');
const expressSession = require('express-session');


const app = express();

const indexRouter = require('./routes/indexRouter');


//------------------------------------Routers-----------------------------------------
app.use('/',indexRouter);


app.listen(3000,()=>{
        console.log(('server running on port 3000'));
})