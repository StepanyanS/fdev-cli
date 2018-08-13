const chalk = require('chalk');

function errorHandler(arg) {
    console.log(chalk.red(`The specified command ("${arg}") is invalid. For a list of available options, run "fdev help".`));
}

module.exports = errorHandler;