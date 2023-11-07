const express = require('express')
const cors = require('cors')
const helmet = require("helmet");
const api = require("./api");
const passport = require("passport");
const session = require('express-session')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');

const app = express()
const port = 8080

app.use(helmet());

app.use(cookieParser());
app.use(express.json());

app.use(cors({origin: "http://localhost:3000", 
        credentials: true}))

app.use(session({
  // secret: process.env.SESSION_KEY,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 3600000 * 1, //1 hours
    // domain: "http://localhost:3000",
    // path: "/",
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
