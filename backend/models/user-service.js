const mongoose = require("mongoose");
const userModel = require("./user");
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



async function findUserByEmail(email) {
  return await userModel.findOne({ email: email });
}

async function findOrCreateUser(entry) {
  const doc1 = await userModel.findOne({
     query: {googleId: entry.googleId},
    });

  const doc2 = await userModel.findOne({
      email: entry.email
     });
  

  if (doc1 || doc2){
    if (doc1)
      return doc1
    else
      return doc2
  }
  else{
    const doc = await userModel.create({
      employeeId: entry.employeeId, 
      email: entry.email.toLowerCase(), 
      password: entry.password, 
      google_id: entry.googleId});
    
    return doc;
  }
}

async function findUser(id) {
  return await userModel.findOne({
    query: {googleId: id},
   });
}

async function addUser(employeeId, email, password, googleId){
    return await userModel.create({
      employeeId: employeeId, 
      email: email.toLowerCase(), 
      password: password, 
      googleId: googleId});
}

exports.findUserByEmail = findUserByEmail;
exports.addUser = addUser;
exports.addUse = addUser;
exports.findOrCreateUser = findOrCreateUser;