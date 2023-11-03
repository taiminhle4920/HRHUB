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
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');
app.use(cors({origin: "http://localhost:3000", credentials: true}))

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
}));
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

app.post('/login', async (req, res) => {
  const{email, password} = req.body;
  if (req.session.authenticated) {
    return res.status(200).json(req.session);
  }
  else{ 
    const user = await userService.findUserByEmail(email);
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const info = await employeeService.findUser(user[0].employeeId);
    const checkPassword = await bcrypt.compare(password, user[0].password);
    console.log(checkPassword);
    if(!checkPassword){
      return res.status(401).json({message: "Incorrect password"});
    }
    const manager = await departmentManagerService.findManager(user[0].employeeId);
 
    const role = manager.length > 0 ? "manager" : "employee";
    // const token = jwt.sign({email, role}, 'jwt-secret-token', {expiresIn: '1h'});
    // res.cookie('token', token);
    // res.cookie('role', role);
    // res.cookie('employeeId', user[0].employeeId);

    req.session.authenticated = true;
    req.session.role = role;
    req.session.employeeId = user[0].employeeId;
    console.log(info)
    req.session.employeeName =info.first_name + " " + info.last_name;
    req.session.save();
    
    return res.json(req.session);
  }
});

app.get("/users", async (req, res) => {
  if (!req.cookies.authenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const role = req.cookies.role;
  if (role !== "manager") {
    return res.status(403).json({ message: "Forbidden" });
  }
  
  const employees = await employeeService.findAllEmployees();
  const departments = await departmentService.findAllDepartments();
  const deptEmps = await departmentEmployeeService.findAllDepartmentEmployees();

  const users = employees.map((employee) => {
    const deptEmp = deptEmps.find((deptEmp) => deptEmp.emp_no === employee.emp_no);
    if (!deptEmp) {
      return null; // Skip this iteration of the loop
    }
    const department = departments.find((department) => department.dept_no === deptEmp.dept_no);
    if (!department) {
      return null; // Skip this iteration of the loop
    }
    return {
      emp_no: employee.emp_no,
      first_name: employee.first_name,
      last_name: employee.last_name,
      department: department.dept_name,
      hire_date: employee.hire_date,
    };
  }).filter(user => user !== null); // Remove any null values from the array
  return res.status(200).json(users);
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
  const employeeId = req.cookies.employeeId;

  

  if(!employeeId){
    return res.status(401).json({message: "Unauthorized"});
  }

  const user = await userService.findUserById(employeeId);
  const data = await employeeService.findUser(employeeId);

  if(user && data){
    const resJson = {
      employeeId: employeeId,
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      email: user[0].email,
    };
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
