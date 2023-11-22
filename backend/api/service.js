const express = require("express")
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const departmentManagerService = require('../models/department_manager-service')
const departmentService = require('../models/department-service')
const departmentEmployeeService = require('../models/department_employee-service')
const titleService = require('../models/title-service')
const salaryService = require('../models/salary-service')

const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", isUserAuthenticated, async (req, res) => { 
    const sessionUser = req.session.user;
    const employeeId = sessionUser.employeeId;
    
    const user = await userService.findUserById(employeeId);
    const employee = await employeeService.findUser(employeeId);
    const deptEmpl = await departmentEmployeeService.findDepartmentEmployeeByEmpId(employeeId);
    const department = await departmentService.findDepartmentByDeptId(deptEmpl[0].dept_no);
    const title = await titleService.findTitleByEmpId(employeeId);

    if(user && employee){
      const resJson = {
        employeeId: employeeId,
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: user[0].email,
        department: department[0].dept_name,
        birth_date: employee.birth_date,
        title: title[0].title,
        dep_from_date: deptEmpl[0].from_date,
        dep_to_date: deptEmpl[0].to_date,
        title_from_date: title[0].from_date,
        title_to_date: title[0].to_date
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
      console.log(data);
      return res.status(200).json(data);
    }
    else{
      return res.status(404).json({message: "salary record not found"});
    }
  });

    router.get("/titles", isUserAuthenticated, async (req, res) => { 
    const sessionUser = req.session.user;
    const employeeId = sessionUser.employeeId;

    const data = await titleService.findTitleByEmpId(employeeId);
    if(data){
      console.log(data);
      return res.status(200).json(data);
    }
    else{
      return res.status(404).json({message: "salary record not found"});
    }
  });
  
module.exports = router;