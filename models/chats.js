const mongoose = require("mongoose");


const chatSchema = mongoose.Schema({
    message: {type: String},
    sentAt: { type: Date}
})

module.exports = mongoose.model('Chat', chatSchema);