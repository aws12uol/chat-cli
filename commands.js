#!/usr/bin/env node
const program = require("commander");
const { addMessage, findMessage, listMessages, removeMessage } = require("./index")


program 
  .version('1.0.0')
  .alias('v')

// Add Command
program
  .command('add <message>')
  .alias('a')
  .action(async (message) => {
    console.info('message id: ', await addMessage({message}));
  });


// Find Command
program
  .command('find <id>')
  .alias('f')
  .action(id => findMessage(id));

// List Command
program
  .command('list')
  .alias('l')
  .action(() => listMessages());

  program
  .command('remove <_id>')
  .alias('r')
  .action(_id => removeMessage(_id));

program.parse(process.argv);