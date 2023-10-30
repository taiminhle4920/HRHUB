const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
    emp_no: {
        type: Number,
        require: true,
    },
    salary: {
        type: Number,
        required: true,
        trim: true,
    },
    from_date: {
        type: String,
        trim: true,
    },
    to_date:{
        type: String,
        trim: true
    }
}, {collection : 'Salary'});


const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;