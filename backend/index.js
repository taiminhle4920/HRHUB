const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userService = require('./models/user-service')
const departmentService = require('./models/department-service')
const employeeService = require('./models/employee-service')
const departmentManagerService = require('./models/department_manager-service')
const departmentEmployeeService = require('./models/department_employee-service')
const salaryService = require('./models/salary-service')
const titleService = require('./models/title-service')

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
  const user = userService.findUserByEmail(email);
  if(!user){
    res.status(404).json({message: "User not found"});
  }
  const checkPassword = bcrypt.compare(password, user.password);
  
  if(!checkPassword){
    res.status(401).json({message: "Incorrect password"});
  }
  res.status(201).json({message: "Login from backend"});
});

  
app.post('/logout', (req, res) => {
  res.status('200').json({message: "Logout from backend"});
  res.end();
})


app.post("/signup", async (req, res) => {
  const{employeeId, email, password} = req.body;
  console.log(employeeId, email, password);
  if (!(email && password && employeeId)) {
    res.status(400).send("All input is required");
  }
  const existedUserWithId = await employeeService.findUser(employeeId);
  const existedUserWithEmail = await userService.findUserByEmail(email);
  if (existedUserWithEmail.length > 0) {
    res.status(409).send("User Already Exist. Please Login");
  }
  if (existedUserWithId.length === 0) {
    res.status(404).send("Employee ID does not exist");
  }
  else if(!isEmail(email)){
    res.status(404).send("Not an email");
  }
  else{
    encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await userService.addUser(employeeId, email, encryptedUserPassword, null);
    if(user){
      res.status(201).json({message: "Added new user", user});
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
