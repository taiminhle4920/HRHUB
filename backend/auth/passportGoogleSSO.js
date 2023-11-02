const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const userService = require('../models/user-service')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
    passReqToCallback: true
},
    async (req, accessToken, refreshToken, profile, cb) => {
        const defaultUser = {
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: null,
        };
        
        const user = await userService.findOrCreateUser(defaultUser).catch((err) => {
            console.log("error signing up", err);
            cb(err, null);
        });

        if (user)
            return cb(null, user);

    }
)
);

passport.serializeUser((user, done) => {
    console.log("serializing")
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    console.log("deserializing")
    const user = await userService.findUserByEmail(email).catch((err) => {
        console.log("Err deserializing", err);
        done(err, null);
    });
    if (user) {
        const foundUser = {
            email: user[0].email,
            role: "null",
            employeeId: "null",
        }
        done(null, foundUser);
    }
})