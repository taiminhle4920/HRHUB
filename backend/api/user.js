const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const departmentManagerService = require('../models/department_manager-service')

const router = express.Router();

router.get("/auth/googleUser", isUserAuthenticated, async (req, res) => {
    const existingGoogleUser = await userService.findUserByEmail(req.user.email).catch((err) => {
      console.log("error in MongoDB", err);
      return res.sendStatus(500)
  });

  if (!existingGoogleUser[0])
    return res.status(401).send("email is not found");

  if (existingGoogleUser[0].employeeId == null){
    let sessionUser = {
      email: existingGoogleUser[0].email,
      role: null,
      employeeId: null,
    };
    req.session.user = sessionUser;
    console.log(sessionUser)
    return res.json(req.session);
  }
  else{
    const manager = await departmentManagerService.findManager(existingGoogleUser[0].employeeId);
    const role = manager.length > 0 ? "manager" : "employee";

    let sessionUser = {
      email: existingGoogleUser[0].email,
      role: role,
      employeeId: existingGoogleUser[0].employeeId,
    };

    req.session.user = sessionUser;
    console.log(sessionUser)
    return res.json(req.session);
  }
  });


router.post("/auth/uploadEmployeeId", isUserAuthenticated, async (req, res) => {
  const incomingId = req.body.employeeId;
  console.log("id : "+ incomingId)
  const existingUser = await userService.findUserByEmployeeId(incomingId).catch((err) => {
      console.log("error in MongoDB", err);
      return res.sendStatus(500)
  });
  
  console.log(existingUser)
  if(existingUser)
    return res.status(403).send("employee Id is already registered to another email!");
  
  const user = await userService.findUserByEmailAndUpdate(req.user.email, {employeeId : incomingId}).catch((err) => {
    console.log("error in MongoDB", err);
    return res.sendStatus(500)
  });

  const manager = await departmentManagerService.findManager(incomingId);
  const role = manager.length > 0 ? "manager" : "employee";
  const sessionUser = {
      email: req.user.email,
      role: role,
      employeeId: incomingId,
   };
   req.session.user = sessionUser;
   return res.json(req.session)
  });


module.exports = router;
