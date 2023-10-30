const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
    emp_no: {
        type: Number,
        require: true,
    },
    title: {
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
}, {collection : 'Title'});


const Title = mongoose.model("Title", TitleSchema);

module.exports = Title;