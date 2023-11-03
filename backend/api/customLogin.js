const express = require('express')
const mongoose = require('mongoose')
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const departmentManagerService = require('../models/department_manager-service')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { session } = require('passport')


const router = express.Router();

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
  }

router.post('/login', async (req, res) => {
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
    const token = jwt.sign({email}, 'jwt-secret-token', {expiresIn: '1h'});
  //   res.cookie('token', token);
  //   res.cookie('role', role);
  //   res.cookie('employeeId', user[0].employeeId);
    const sessionUser = {
      email: email,
      role: role,
      employeeId: user[0].employeeId,
   };
    console.log(req.session.id)
    req.session.user = sessionUser;
    // req.session.user = sessionUser
    res.json(req.session)
    // return res.json({message: "Login from backend", Status: "Success", role: role, employeeId: user[0].employeeId});
  });
  
    
  router.post('/logout', (req, res) => {
    // Extract the 'token' cookie from the request headers
    const cookies = req.headers.cookie;
    if (!cookies || !cookies.includes('token=')) {
      return res.status(401).json({ message: "Token not found" });
    }
  
    // Extract the 'token' value from the cookie string
    const token = cookies.split('token=')[1].split(';')[0].trim();
  
    // You may add token validation logic here, if required.
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.clearCookie('token'); // This clears the cookie in the response (optional)
    return res.status(200).json({ message: "Logged out successfully" });
  });
  
  
  
  router.post("/signup", async (req, res) => {
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


module.exports = router;