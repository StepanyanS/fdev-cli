import chalk from 'chalk';
import { textSync } from 'figlet';

import { IHandler } from './../models/handler.d';

class VersionHandler implements IHandler {
    handle(): void {
        console.log(
            chalk.blue(
                textSync(
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
}

export const versionHandler = new VersionHandler();