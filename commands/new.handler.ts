import chalk from 'chalk';
import { IHandler } from '../models/handler';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';
import { platform } from 'os';
import { copySync as fseCopySync } from 'fs-extra';

import { dirExists } from '../utils/utils';
import { PROJECT_CONFIG } from '../config/config';

class NewHandler implements IHandler {

    private copyProject(projectName: string): void {
        try {
            fseCopySync(PROJECT_CONFIG.PROJECT_PATH, `${process.cwd()}/${projectName}`);
        } catch (err) {
            console.error(err);
        }
    }

    private generateProject(projectName: string, skipInstall: boolean = false): void {
        if(dirExists(`${process.cwd()}/${projectName}`)) {
            return console.log(chalk.red(`Directory ${projectName} is already exists in the current directory.`));
        }
        mkdirSync(`${process.cwd()}/${projectName}`);
        this.copyProject(projectName);
        const packageJson = JSON.parse(readFileSync(`${process.cwd()}/${projectName}/package.json`, 'utf-8'));
        packageJson.name = projectName.toLowerCase();
        writeFileSync(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(packageJson, null, 4));
        console.log(chalk.green(`Created project's files.`));

        if(skipInstall) {
            const npmCmd = platform().startsWith('win') ? 'npm.cmd' : 'npm';
            spawnSync(npmCmd, ['i'], { env: process.env, cwd: `${process.cwd()}/${projectName}`, stdio: 'inherit'});
        }
        console.log(chalk.green(`Project ${projectName} was successfully created`));
    }

    public handle(projectName: string, skipInstall: string): void {
        if(skipInstall && skipInstall === 'skip-install') {
            this.generateProject(projectName);
        }
        else {
            if(!projectName) {
                console.log(chalk.red(`You must specify project name`));
                process.exit();
            }
            this.generateProject(projectName, true);
        }
        process.exit();
    }
}

export const newHandler = new NewHandler();