import { IHandler } from './../models/handler.d';
import chalk from 'chalk';

class UndefinedHandler implements IHandler {

    public handle(): void {
        console.log(chalk.red(`You must specify command. For a list of available commands, run "fdev help" or "fdev -h".`));
        process.exit();
    }
}

export const undefinedHandler = new UndefinedHandler();