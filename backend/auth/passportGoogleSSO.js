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
    async (req, accessToken, refreshToken, profile, done) => {
        const profileUser = {
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: null,
        };

        const existingUser = await userService.findUserByEmail(profileUser.email).catch((err) => {
            console.log("error signing up", err);
            return done(err, null);
        });
        if (existingUser[0]){
            if (existingUser[0].googleId == null)
                return done(null, false);
            else
                return done(null, existingUser[0]);
        }
        else{
            const newUser = await userService.addUser(null, profileUser.email, null, profileUser.googleId).catch((err) => {
                console.log("error signing up", err);
                return done(err, null);
            });
            return done(null, newUser);
        }
        
        const user = await userService.findOrCreateUser(defaultUser).catch((err) => {
            console.log("error signing up", err);
            done(err, null);
        });

        if (user)
            return done(null, user);

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