const mongoose = require("mongoose");

const DepartmentEmployeeSchema = new mongoose.Schema({
    emp_no: {
        type: Number,
        require: true,
    },
    dept_no: {
        type: String,
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
}, {collection : 'Department_Employee'});


const Department_Employee = mongoose.model("Department_Employee", DepartmentEmployeeSchema);

module.exports = Department_Employee;