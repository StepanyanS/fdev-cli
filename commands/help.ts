import chalk from 'chalk';

import { IHandler } from './../models/handler.d';

class HelpHandler implements IHandler {
    handle(): void {
        console.log('Available Commands');
        console.log('  ', chalk.blue('new'), 'Generates new project with given name');
        console.log('  ', chalk.blue('generate'), 'Generates files based on a schematic.');
        process.exit();
    }
}

export const helpHandler = new HelpHandler();