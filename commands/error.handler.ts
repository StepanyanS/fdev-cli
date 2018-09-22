import chalk from 'chalk';

import { IHandler } from '../models/handler';

class ErrorHandler implements IHandler {
    public handle(arg: string): void {
        console.log(chalk.red(`The specified command ("${arg}") is invalid. For a list of available options, run "fdev help".`));
        process.exit();
    }
}

export const errorHandler = new ErrorHandler();