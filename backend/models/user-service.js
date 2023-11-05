const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
const { findUser } = require("./employee-service");
const ObjectId = require('mongodb').ObjectId;

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

async function findUserById(id){
  return await userModel.find({employeeId: id});
}

async function findAllUsers(){
  return await userModel.find();
}
async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function findUserByObjectId(id) {
  return await userModel.findOne({_id: new ObjectId(id)});
}

async function findUserByEmployeeId(id) {
  return await userModel.findOne({'employeeId': id});
}

async function findUserByEmailAndUpdate(email, query) {
  return await userModel.updateOne(
    { email: email },
    { $set: query });
}

async function addUser(employeeId, email, password, googleId){
    return await userModel.create({
      employeeId: employeeId, 
      email: email.toLowerCase(), 
      password: password, 
      googleId: googleId});
}

exports.findUserById = findUserById;
exports.findUserByObjectId = findUserByObjectId;
exports.findUserByEmail = findUserByEmail;
exports.addUser = addUser;
exports.addUse = addUser;
exports.findAllUsers = findAllUsers;
exports.findUserByEmployeeId = findUserByEmployeeId;
exports.findUserByEmailAndUpdate = findUserByEmailAndUpdate;