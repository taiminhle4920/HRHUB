const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
    label: {
        type: Number,
        require: true,
    },
    data: {
        type: Array,
        default: [],
    },

}, {collection : 'Statistic'});


const Salary = mongoose.model("Statistic", StatisticSchema);

module.exports = StatisticSchema;