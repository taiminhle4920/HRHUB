const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

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
        }

        const user = await User.findOrCreate({ 
            where: { googleId: profile.id }, defaults: defaultUser
        }).catch((err) => {
            console.log("error signing up", err);
            cb(err, null);
        });

        if (user && user[0])
            return cb(null, user && user[0]);

    }
)
);

passport.serializeUser((user, cb) => {
    console.log("Serializing user: ", user)
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
        console.log("Err deserializing", err);
        cb(err, null);
    });

    console.log("DeSerialized User", user);

    if (user) 
        cb(null, user);
})