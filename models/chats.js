import mongoose from 'mongoose'


const chatSchema = mongoose.Schema({
    message: {type: String},
    sentAt: { type: Date}
})

export default mongoose.model('Chat', chatSchema);