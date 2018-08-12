const chalk = require('chalk');

function errorHandler() {
    console.log(chalk.red(`The specified command ("${process.argv.slice(2)[0]}") is invalid. For a list of available options, run "fdev help".`));
}

module.exports = errorHandler;