const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    employeeId: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    google_id:{
        type: String,
    }
}, {collection : 'User'});


const User = mongoose.model("User", UserSchema);

module.exports = User;