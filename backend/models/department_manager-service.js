const mongoose = require("mongoose");
const dmModel = require("./department_manager");
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


async function findManager(employeeId) {
  return await dmModel.find({ emp_no: employeeId });
}

async function addDepManager(emp_no, dept_no, from_date, to_date) {
  return await dmModel.create({ emp_no: emp_no, dept_no: dept_no, from_date: from_date, to_date: to_date });
}

async function findAllManager() {
  return await dmModel.find();
}
exports.findAllManager = findAllManager;
exports.findManager = findManager;
exports.addDepManager = addDepManager;