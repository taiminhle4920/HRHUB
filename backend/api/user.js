const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const departmentManagerService = require('../models/department_manager-service')
const departmentService = require('../models/department-service')
const departmentEmployeeService = require('../models/department_employee-service')
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



router.get("/users", async (req, res) => {
  if (!req.session.role === "manager") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let name = req.query.term;
  console.log(name);
  console.log(req.query)
  if (name !== undefined) {
    name = name.split(" ");
    
    const employees = await employeeService.findEmployeeByName(name[0], name[1]);
    const deptEmpl = await departmentEmployeeService.findDepartmentEmployeeByEmpId(employees[0].emp_no);

    const department = await departmentService.findDepartmentByDeptId(deptEmpl[0].dept_no);
    return res.status(200).json({
      emp_no: employees[0].emp_no,
      first_name: employees[0].first_name,
      last_name: employees[0].last_name,
      department: department[0].dept_name,
      hire_date: employees[0].hire_date,
    });
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
  
module.exports = router;
