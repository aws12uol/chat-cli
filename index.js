const mongoose = require("mongoose");
const Chat = require("./models/chats")


// Connect to db
mongoose.connect('mongodb+srv://root:admin@cluster0.dnptdyb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Add Message
const addMessage = async (msg) => {
  return await Chat.create(msg).then(message => {
    console.info('Message Added to DB');
    mongoose.connection.close();
    return message._id;
  });
}


const findMessage = async (id) => {
  return await Chat.findById(id)
    .then(messages => {
      console.info('Message fetched from DB');
      console.info(messages);
      mongoose.connection.close();
      return {
        message: messages.message,
        sender: messages.sender,
        date: messages.date
      }
    });
}


// List messages
const listMessages = () => {
  Chat.find()
    .then(messages => {
      console.info(messages);
      console.info(`Total messages: ${messages.length}`);
      mongoose.connection.close();
    });
}

// Remove messages
const removeMessage = (_id) => {
  Chat.deleteOne({_id} )
    .then(msg => {
      console.info('message Removed');
      mongoose.connection.close();
    });
}


module.exports = {
  addMessage,
  findMessage,
  listMessages,
  removeMessage
}