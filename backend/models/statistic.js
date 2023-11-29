const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
    label: {
        type: String,
        require: true,
    },
    data: {
        type: String,
        default: '',
    },

}, {collection : 'Statistic'});


const Statistic = mongoose.model("Statistic", StatisticSchema);

module.exports = Statistic;