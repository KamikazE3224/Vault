const db = require('../db/queries');

async function signUpForm(req,res){
        res.render('signup');
}
async function createUser(req,res){
        
                if(!errors.isEmpty()){
                        return res.render('signup',{errors:errors.array()})
                }
        
                const {name,email,password} = req.body;
                const hashedPassword = await bcrypt.hash(password,10);
        
                await db.postDetails(name,email,hashedPassword);
                res.redirect('/log-in');
        
}


module.exports={
        signUpForm,
        createUser
}