const mongoose = require("mongoose");
const titleModel = require("./title");
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


async function findTitleByEmpId(id){
    return await titleModel.find({emp_no: id});
}

async function addTitle(emp_no, title, from_date, to_date){
  return await titleModel.create({emp_no:emp_no, title:title, from_date:from_date, to_date:to_date});
}

exports.addTitle = addTitle;
exports.findTitleByEmpId = findTitleByEmpId;