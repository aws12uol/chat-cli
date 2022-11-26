#!/usr/bin/env node
import { program } from 'commander';
import { createPromptModule } from 'inquirer';
import { addMessage, findMessage, listMessages} from './index.js'

const prompt = createPromptModule();

// Customer Questions
const questions = [
  {
    type: 'input',
    name: 'message',
    message: 'Enter Message: '
  }
];

program 
  .version('1.0.0')
  .alias('v')
// program
//   .help(`
// Function                  Alias        Description
// version                   v            To check the version of the customer-cli
// client-cli add            a            To add new customes in the database
// client-cli list           l            To check all the customes in the database
// client-cli update [_ID]   u            To update details for specific customes in the database
// client-cli remove [_ID]   r            To remove details for specific customes in the database
// client-cli find [NAME]    f            To find a specific customes in the database
// `)


// Add Command
program
  .command('add')
  .alias('a')
  .action(() => {
    prompt(questions).then(answers => addMessage(answers));
  });

// Find Command
program
  .command('find <msg>')
  .alias('f')
  .action(msg => findMessage(msg));

// List Command
program
  .command('list')
  .alias('l')
  .action(() => listMessages());

program.parse(process.argv);