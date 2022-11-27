const mongoose = require("mongoose");
const Chat = require("./models/chats")


// Connect to db
mongoose.connect('mongodb+srv://root:admin@cluster0.dnptdyb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Add Message
const addMessage = (msg) => {
  Chat.create(msg).then(msg => {
    console.info('Message Added');
    mongoose.connection.close();
  });
}

// Find 
const findMessage = (msg) => {
  // Make case insensitive
  const search = new RegExp(msg, 'i');
  Chat.find({$or: [{message: search}]})
    .then(messages => {
      console.info(messages);
      console.info(`${messages.length} matches`);
      mongoose.connection.close();
    });
}



// List Customers
const listMessages = () => {
  Chat.find()
    .then(messages => {
      console.info(messages);
      console.info(`Total messages: ${messages.length}`);
      mongoose.connection.close();
    });
}

module.exports = {
  addMessage,
  findMessage,
  listMessages
}