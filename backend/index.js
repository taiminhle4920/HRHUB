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
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');
app.use(cors({origin: "http://localhost:3000", credentials: true}))

app.use(cookieParser());
app.use(express.json())
const port = 8080
const session = {};
function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) { return true; }
  
  return false;
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', async (req, res) => {
  const{email, password} = req.body;
  const user = await userService.findUserByEmail(email);
  if(!user){
    return res.status(404).json({message: "User not found"});
  }

  const checkPassword = bcrypt.compare(password, user[0].password);
  
  if(!checkPassword){
    return res.status(401).json({message: "Incorrect password"});
  }
  const manager = await departmentManagerService.findManager(user[0].employeeId);
  const role = manager.length > 0 ? "manager" : "employee";
  const token = jwt.sign({email, role}, 'jwt-secret-token', {expiresIn: '1h'});
  res.cookie('token', token);
  res.cookie('role', role);
  res.cookie('employeeId', user[0].employeeId);


  return res.json({message: "Login from backend", Status: "Success", role: role, token: token, employeeId: user[0].employeeId});
});

  
app.post('/logout', (req, res) => {
  // Extract the 'token' cookie from the request headers
  const cookies = req.headers.cookie;
  if (!cookies || !cookies.includes('token=')) {
    return res.status(401).json({ message: "Token not found" });
  }

  // Extract the 'token' value from the cookie string
  const token = cookies.split('token=')[1].split(';')[0].trim();

  // You may add token validation logic here, if required.

  res.clearCookie('token'); // This clears the cookie in the response (optional)
  return res.status(200).json({ message: "Logged out successfully" });
});



app.post("/signup", async (req, res) => {
  const{employeeId, email, password} = req.body;
  console.log(employeeId, email, password);
  if (!(email && password && employeeId)) {
    return res.status(400).send("All input is required");
  }
  const existedUserWithId = await employeeService.findUser(employeeId);
  const existedUserWithEmail = await userService.findUserByEmail(email);
  if (existedUserWithEmail.length > 0) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  if (existedUserWithId.length === 0) {
    return res.status(404).send("Employee ID does not exist");
  }
  else if(!isEmail(email)){
    return res.status(404).send("Not an email");
  }
  else{
    encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await userService.addUser(employeeId, email, encryptedUserPassword, null);
    if(user){
      return res.status(201).json({message: "Added new user", user});
    } else {
      return res.status(500).send("Internal Server Error");
    }
  }
});

app.get("/profile", async (req, res) => { 
  console.log(req.headers);
  console.log(req.headers['employeeid']);
  const employeeId = req.headers['employeeid'];
  if(!employeeId){
    return res.status(401).json({message: "Unauthorized"});
  }

  const user = await userService.findUserById(employeeId);
  const data = await employeeService.findUser(employeeId);
  console.log(user);
  console.log(data);
  if(user && data){
    const resJson = {
      employeeId: employeeId,
      firstName: data.first_name,
      lastName: data.last_name,
      birth_date: data.birth_date,
      email: user[0].email,
    };
    console.log(resJson);
    return res.status(200).json(resJson);
  }
  else{
    return res.status(404).json({message: "User not found"});
  }
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});
