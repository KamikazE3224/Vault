const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pgPool = require('../db/queries');

passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {

            const { rows } = await pgPool.getUserByIdentifier(email);

            const user = rows[0];

            if (!user) {
                console.log('incorrect username');
                return done(null, false, {
                    message: 'user not found'
                });
            }

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                console.log('incorrect password');

                return done(null, false, {
                    message: 'incorrect password'
                });
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
        //console.log("SERIALIZING USER:", user);
        done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        //console.log("DESERIALIZING USER ID:", id);
        const { rows } = await pgPool.getUserById(id);//we
        const user = rows[0];
        //console.log("DESERIALIZED USER:", user);
        done(null, user);

    } catch (err) {
        done(err);
    }
});