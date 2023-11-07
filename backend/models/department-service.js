const mongoose = require("mongoose");
const deptModel = require("./department");
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


async function findAllDepartments(){
  return await deptModel.find();
}

async function findDepartmentByDeptId(id){
  return await deptModel.findone({dept_no:id });
}

exports.findAllDepartments = findAllDepartments;