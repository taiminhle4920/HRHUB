const mongoose = require("mongoose");
const empModel = require("./employee");
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

async function findUser(id){
    return await empModel.findOne({emp_no: id});
}

async function findAllEmployees(){ 
  return await empModel.find().limit(1000);
}

async function findEmployeeByName(first_name, last_name) {
  return await empModel.find({
    first_name: { $regex: new RegExp(first_name, 'i') }, // 'i' flag for case-insensitive
    last_name: { $regex: new RegExp(last_name, 'i') },   // 'i' flag for case-insensitive
    // first_name: first_name,
    // last_name: last_name
  });
}

async function updateEmployee(employeeId, first_name, last_name, birth_date){
  return await empModel.updateOne({emp_no: employeeId}, {first_name: first_name, last_name: last_name, birth_date: birth_date});
}

async function addEmp(emp_no, birth_date, first_name, last_name, gender, hire_date){
  return await empModel.create({emp_no:emp_no, birth_date:birth_date, first_name:first_name, last_name:last_name, gender:gender, hire_date:hire_date});
}


exports.findUser = findUser;
exports.findAllEmployees = findAllEmployees;
exports.findEmployeeByName = findEmployeeByName;
exports.addEmp = addEmp;
exports.updateEmployee = updateEmployee;