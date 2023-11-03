const express = require("express")
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')

const router = express.Router();

router.get("/profile", async (req, res) => { 
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
  
module.exports = router;