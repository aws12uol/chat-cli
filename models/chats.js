const mongoose = require("mongoose");


const chatSchema = mongoose.Schema({
    message: { type: String },
    sender: { type: String },
    date: { type: String }
})

module.exports = mongoose.model('Chat', chatSchema);