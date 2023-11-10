const express = require("express")
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const salaryService = require('../models/salary-service')

const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", isUserAuthenticated, async (req, res) => { 
    const sessionUser = req.session.user;
    const employeeId = sessionUser.employeeId;
    
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

  router.get("/salary", isUserAuthenticated, async (req, res) => { 
    const sessionUser = req.session.user;
    const employeeId = sessionUser.employeeId;
    
    const data = await salaryService.findSalaryByEmployeeId(employeeId);

    if(data){
      // const resJson = {
      //   employeeId: employeeId,
      //   firstName: data.first_name,
      //   lastName: data.last_name,
      //   birth_date: data.birth_date,
      //   email: user[0].email,
      // };
      console.log(data);
      return res.status(200).json(data);
    }
    else{
      return res.status(404).json({message: "User not found"});
    }
  });
  
module.exports = router;