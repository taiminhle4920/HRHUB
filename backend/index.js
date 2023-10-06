const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userService = require('./models/user-service')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const app = express()
app.use(cors())
app.use(express.json())
const port = 8080

function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) { return true; }
  
  return false;
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  const{email, password} = req.body;
  console.log(req.body);
  return res.status(201).json({message: "Login from backend"});
})

app.post('/logout', (req, res) => {
  console.log(req.body);
  return res.status(201).json({message: "Logout from backend"});
})


app.post("/signup", async (req, res) => {
  const{employeeId, email, password} = req.body;
  console.log(employeeId, email, password);

  const check = isEmail(email);
  console.log(check);
  return res.status(201).json({message: "Added new user", email});

  if (!(email && password && firstName && lastName && dob)) {
    return res.status(400).send("All input is required");
  }
  
  const existedUserWithEmail = await userService.findUserByEmail(email);
  if (existedUserWithEmail.length > 0) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  else if(!isEmail(email)){
    return res.status(404).send("Not an email");
  }
  else{
    encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await userService.addUser(firstName, lastName, email, password, dob);
    if(user){
    console.log(encryptedUserPassword);
    console.log(user);
    return res.status(201).json({message: "Added new user", user});
    }
    else{
      return res.status(500).send("Internal Server Error");
    }
  }
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
