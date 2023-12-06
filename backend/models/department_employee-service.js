const mongoose = require("mongoose");
const deModel = require("./department_employee");
const dotenv = require("dotenv");


dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));


async function findDepartmentEmployeeByEmpId(id){
  return await deModel.find({emp_no: id});
}

async function findAllDepartmentEmployees(){
  return await deModel.find().limit(1000);
}

async function addDeptEmp(emp_no, dept_no, from_date, to_date){
  return await deModel.create({emp_no:emp_no, dept_no:dept_no, from_date:from_date, to_date:to_date});
}
async function findAllDepartmentEmployeesNoLimit(){
  return await deModel.find();
}
async function updateDepartmentEmployee(emp_no, dept_no, from_date, to_date){
  return await deModel.updateOne({emp_no: emp_no}, {dept_no: dept_no, from_date: from_date, to_date: to_date});
}
exports.updateDepartmentEmployee = updateDepartmentEmployee;
exports.findDepartmentEmployeeByEmpId = findDepartmentEmployeeByEmpId;
exports.findAllDepartmentEmployees = findAllDepartmentEmployees;
exports.addDeptEmp = addDeptEmp;
exports.findAllDepartmentEmployeesNoLimit = findAllDepartmentEmployeesNoLimit; 
