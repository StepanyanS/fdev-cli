const figlet = require('figlet');
const chalk = require('chalk');

function versionHandler() {
    console.log(
        chalk.blue(
            figlet.textSync(
                'FDEV',
                {
                    horizontalLayout: 'full'
                }
            )
        )
    );
    console.log(chalk.green(`Fdev CLI:  ${JSON.stringify(require('../package.json').version).substr(1).slice(0, -1)}\nNode:      ${process.version.substr(1)}\nOS:        ${process.platform} ${process.arch}`));
    process.exit();
}

module.exports = versionHandler;