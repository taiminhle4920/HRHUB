const mongoose = require("mongoose");

const DepartmentManagerSchema = new mongoose.Schema({
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
}, {collection : 'Department_Manager'});


const Department_Manager = mongoose.model("Department_Manager", DepartmentManagerSchema);

module.exports = Department_Manager;