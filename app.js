const path = require('node:path');
const express = require('express');


const app = express();

const indexRouter = require('./routes/indexRouter');



app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');


//------------------------------------Routers-----------------------------------------
app.use('/',indexRouter);


app.listen(3000,()=>{
        console.log(('server running on port 3000'));
})