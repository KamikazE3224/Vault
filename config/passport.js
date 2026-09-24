const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/queries');


    passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                const user = await db.getUserByIdentifier(email);

                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }

                const match = await bcrypt.compare(
                    password,
                    user.password
                );

                console.log("PASSWORD MATCH:", match);

                if (!match) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }

                console.log("LOGIN SUCCESS");

                return done(null, user);

            } catch (err) {
                console.log("LOGIN ERROR:", err);
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    //console.log("SERIALIZING USER:", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        //console.log("DESERIALIZING USER ID:", id);

        const user = await db.getUserById(id);

        //console.log("DESERIALIZED USER:", user);

        if (!user) {
            return done(null, false);
        }

        done(null, user);

    } catch (err) {
        done(err);
    }
});