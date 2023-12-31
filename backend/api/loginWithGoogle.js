const express = require("express")
const passport = require("passport")
const { isUserAuthenticated } = require("../middlewares/auth");
const jwt = require('jsonwebtoken');
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
        console.log("User: ", req.user);
        req.session.user = req.user;
        res.json(req.session)
    }
);

router.get('/logout/google', isUserAuthenticated, async function(req, res, next) {
    req.logout(function(err) {
    if (err) { 
        console.log("logout failed")
        return next(err); 
    }});
    req.session.destroy();
    console.log("logout success");
    res.send("You have been signed out");
  });

module.exports = router;