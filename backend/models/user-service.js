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
  return await userModel.find({ email: email });
}

async function addUser(firstName, lastName, email, password, dob){
    return await userModel.create({
        firstName: firstName, 
        lastName: lastName, 
        email: email.toLowerCase(), 
        password: password, 
        dob: dob});
}

exports.findUserByEmail = findUserByEmail;
exports.addUser = addUser;