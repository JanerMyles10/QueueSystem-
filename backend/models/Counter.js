const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    prefix: {type:string, required: true},
    date: {type:string, required: true},
    value: {type: Number, default: 0},
});

module.exports = mongoose.model("Counter", counterSchema);
