const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    emp_no: {
        type: Number,
        require: true,
    },
    birth_date: {
        type: String,
        trim: true,
    },
    first_name:{
        type: String,
        trim: true
    },
    last_name:{
        type: String,
        trim: true,
    },
    gender:{
        type: String,
        trim: true,
    },
    hire_date: {
        type: String,
        trim: true,
    },

}, {collection : 'Employee'});


const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;