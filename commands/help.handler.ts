import chalk from 'chalk';

import { IHandler } from '../models/handler';

class HelpHandler implements IHandler {
    public handle(): void {
        console.log('Available Commands');
        console.log('  ', chalk.blue('new | n'), 'Generates new project with given name');
        console.log('  ', chalk.blue('generate | g'), 'Generates files based on a schematic.');
        console.log('  ', chalk.blue('integrate | i'), 'integrates Icomoon into project');
        process.exit();
    }
}

export const helpHandler = new HelpHandler();