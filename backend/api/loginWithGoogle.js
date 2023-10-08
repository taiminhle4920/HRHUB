const express = require("express")
const passport = require("passport")

const router = express.Router();

const successLoginURL = "http://localhost:3000/login/success"
const failureLoginURL = "http://localhost:3000/login/error"

router.get("/login/google", 
    passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback",

    passport.authenticate("google", {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: failureLoginURL,
        successRedirect: successLoginURL,
    }),

    (req, res) => {
        console.log("test")
        console.log("User: ", req.user);
        res.send("thank you for signing in!")
    }
);

module.exports = router;