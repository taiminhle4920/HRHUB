const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const userService = require('../models/user-service')
const employeeService = require('../models/employee-service')
const departmentManagerService = require('../models/department_manager-service')
const departmentService = require('../models/department-service')
const departmentEmployeeService = require('../models/department_employee-service')
const statisticService = require('../models/statistic-service')
const salaryService = require('../models/salary-service')
const titleService = require('../models/title-service')
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
  const sessionUser = req.session.user;
  const role = sessionUser.role;
  console.log(role);
  if (role === "employee") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log(req.session.user.role);
  let name = req.query.term;
  
  console.log(req.query)
  if (name !== undefined) {
    name = name.split(" ");
    
    const employee = await employeeService.findEmployeeByName(name[0], name[1]);
    console.log(employee);
    // if (employee.length > 0){
    //   const deptEmpl = await departmentEmployeeService.findDepartmentEmployeeByEmpId(employee[0].emp_no);
    //   if (deptEmpl.length > 0){
    //     const department = await departmentService.findDepartmentByDeptId(deptEmpl[0].dept_no);
    //     if (department.length > 0){
    
    //       const users = {
    //         emp_no: employee[0].emp_no,
    //         first_name: employee[0].first_name,
    //         last_name: employee[0].last_name,
    //         department: department[0].dept_name,
    //         hire_date: employee[0].hire_date,
    //       };
    //       const returnVal = [users];
    //       return res.status(200).json(returnVal);
    //     }
    //   }
    // }
    const users = [];
    for (let i = 0; i < employee.length; i++) {
      const deptEmpl = await departmentEmployeeService.findDepartmentEmployeeByEmpId(employee[i].emp_no);
      if (deptEmpl.length > 0){
        const department = await departmentService.findDepartmentByDeptId(deptEmpl[0].dept_no);
        if (department.length > 0){
    
          const user = {
            emp_no: employee[i].emp_no,
            first_name: employee[i].first_name,
            last_name: employee[i].last_name,
            department: department[0].dept_name,
            hire_date: employee[i].hire_date,
          };
          users.push(user);
          
        }
      }
    }
    return res.status(200).json(users);
  }
  else{

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
  }
});

router.get("/getemployeedata/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const employee = await employeeService.findUser(req.params.id);
    const deptEmpl = await departmentEmployeeService.findDepartmentEmployeeByEmpId(req.params.id);
    const department = await departmentService.findDepartmentByDeptId(deptEmpl[0].dept_no);
    const title = await titleService.findTitleByEmpId(req.params.id);
    const users = {
      emp_no: employee.emp_no,
      first_name: employee.first_name,
      last_name: employee.last_name,
      department: department[0].dept_name,
      birth_date: employee.birth_date,
      title: title[0].title,
      dep_from_date: deptEmpl[0].from_date,
      dep_to_date: deptEmpl[0].to_date,
      title_from_date: title[0].from_date,
      title_to_date: title[0].to_date
    };
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/addemployee', async (req, res) => {
  try {
    // const curRole = req.session.role;
    
    // if (curRole !== "manager") {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    
    const { employeeId, birth_date, first_name, last_name, gender, title, from_date, to_date, dep_no, dep_name, role } = req.body;
    console.log(from_date);
    const existingEmployee = await employeeService.findUser(employeeId);
    console.log(existingEmployee);
    if (existingEmployee) {
      return res.status(403).json({ message: "Employee id already exists" });
    }
    const existingDepartment = await departmentService.findDepartmentByDeptId(dep_no);
    
    if (!existingDepartment) {
      const addDeparment = await departmentService.addDepartment(dep_no, dep_name);

    }
    const res1 = await employeeService.addEmp(employeeId,birth_date,first_name,last_name,gender,from_date);
    const res2 = await titleService.addTitle(employeeId, title, from_date, to_date);
    let res3;
    if(role === "manager")
      res3 = await departmentManagerService.addDepManager(employeeId, dep_no, from_date, to_date);
    else
      res3 = await departmentEmployeeService.addDeptEmp(employeeId, dep_no, from_date, to_date);
    if (res1 && res2 && res3)
      return res.status(200).json({ message: "Employee added successfully" });
    else
      return res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
  
router.get('/empdistribution', async(req, res) => {

    // const employees = await departmentEmployeeService.findAllDepartmentEmployeesNoLimit();
    // const departments = await departmentService.findAllDepartments();
    // const managers = await departmentManagerService.findAllManager();

    // const empCount = {};
    // employees.forEach(emp => {
    //   const dept = departments.find(dep => dep.dept_no === emp.dept_no);

    //   if (!empCount[dept.dept_name]) {
    //     empCount[dept.dept_name] = 1;
    //   } else {
    //     empCount[dept.dept_name]++;
    //   }
    // });
    // managers.forEach(manager => {
    //   const dept = departments.find(dep => dep.dept_no === manager.dept_no);
    //   if (!empCount[dept.dept_name]) {
    //     empCount[dept.dept_name] = 1;
    //   } else {
    //     empCount[dept.dept_name]++;
    //   }
    // });
    empCount = {
        'Development': 85710,
        'Sales': 52247,
        'Production': 73489,
        'Human Resources': 17788,
        'Research': 21128,
        'Quality Management': 20121,
        'Customer Service': 23584,
        'Marketing': 20213,
        'Finance': 17348,
        'Engineering': 2
      }

    const stats = await statisticService.createOrUpdateStat("empCount", JSON.stringify(empCount))
    console.log(stats.data);
    return res.status(200).json(empCount);

});

router.get("/getEmployeeSalary", isUserAuthenticated, async (req, res) => { 
    if (!req.session.role === "manager") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let name = req.query.term;
  console.log(name);
  console.log(req.query)

  if (name !== undefined) {
    name = name.split(" ");
  }

  const employee = await employeeService.findEmployeeByName(name[0], name[1]);
 if (employee.length > 0){
    const employeeId = employee[0].emp_no;
    const data = await salaryService.findSalaryByEmployeeId(employeeId);

    if(data.length > 0){
      console.log(data);
      return res.status(200).json(data);
    }
    else{
      return res.status(404).json({message: "salary record not found"});
    }
 }
});

router.put("/editprofile/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const {firstName, lastName, department, birthDate, title, dep_from_date,dep_to_date, title_from_date, title_to_date} = req.body;
  const employeeId = req.params.id;
  const res1 = await employeeService.updateEmployee(employeeId, firstName, lastName, birthDate);
  const res2 = await titleService.updateTitle(employeeId, title, title_from_date, title_to_date);
  const res3 = await departmentEmployeeService.updateDepartmentEmployee(employeeId, department, dep_from_date, dep_to_date);
  if (res1 && res2 && res3)
    return res.status(200).json({ message: "Employee updated successfully" });
  else
    return res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
