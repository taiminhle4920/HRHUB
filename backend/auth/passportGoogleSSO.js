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
            console.log("user returned");
            return cb(null, user);

    }
)
);

passport.serializeUser((user, cb) => {
    console.log("Serializing user: ", user)
    console.log("user id:", user.id)
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await userService.findOne({ where: { id } }).catch((err) => {
        console.log("Err deserializing", err);
        cb(err, null);
    });

    console.log("DeSerialized User", user);

    if (user) 
        cb(null, user);
})