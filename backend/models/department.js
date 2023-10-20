const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    dept_no: {
        type: String,
        required: true,
        trim: true,
    },
    dept_name: {
        type: String,
        required: true,
        trim: true,
    }
}, {collection : 'Department'});


const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;