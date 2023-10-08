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
const cookieSession = require("cookie-session");

app.use(helmet());
app.use(cors())
app.use(express.json())

require("./auth/passport");
require("./auth/passportGoogleSSO");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use("/api", api);


app.use("/api", api)

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
