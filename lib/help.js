const chalk = require('chalk');

function helpHandler() {
    console.log('Available Commands');
    console.log('  ', chalk.blue('generate'), 'Generates files based on a schematic.');
}

module.exports = helpHandler;