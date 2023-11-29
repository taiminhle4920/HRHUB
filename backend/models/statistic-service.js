const mongoose = require("mongoose");
const statModel = require("./statistic");
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

async function findStat(label){
  const entry = statModel.findOne({label: label});
  if (entry)
    return entry
  return {}
}

async function createOrUpdateStat(label, stats){
  const entry = await statModel.findOne({label: label});
  if (entry)
    return entry
  else{
    return await statModel.create({
      label: label, 
      data: stats
    });
  }
};

exports.findStat = findStat;
exports.createOrUpdateStat = createOrUpdateStat;
