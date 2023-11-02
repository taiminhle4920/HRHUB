const express = require('express')
const cors = require('cors')
const helmet = require("helmet");
const mongoose = require('mongoose')
const userService = require('./models/user-service')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const app = express()
const port = 8080

const api = require("./api");
const passport = require("passport");
//const cookieSession = require("cookie-session");
const session = require('express-session')

app.use(helmet());
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 3600000 * 1 //1 hours
   }
}));

require("./auth/passport");
require("./auth/passportGoogleSSO");


app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.use("/api", api)

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
