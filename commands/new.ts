import chalk from 'chalk';
import { IHandler } from '../models/handler';
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, Stats } from 'fs';
import { resolve } from 'path';
import { spawnSync } from 'child_process';
import { platform } from 'os';
import { dirExists } from '../utils/utils';

class NewHandler implements IHandler {
    private projectPath = resolve(__dirname, '../assets/project');

    private createDirectoryContents(projectPath: string, projectName: string): void {
        const filesToCreate = readdirSync(projectPath);
        filesToCreate.forEach((file: string): void => {
            const origFilePath: string = `${projectPath}/${file}`;
            const stats: Stats = statSync(origFilePath);
            if(stats.isFile()) {
                const contents: string = readFileSync(origFilePath, 'utf8');
                const writePath: string = `${process.cwd()}/${projectName}/${file}`;
                writeFileSync(writePath, contents, 'utf8');
            }
            else if (stats.isDirectory()) {
                mkdirSync(`${process.cwd()}/${projectName}/${file}`);
                this.createDirectoryContents(`${projectPath}/${file}`, `${projectName}/${file}`);
            }
        })
    }

    private generateProject(projectName: string): void {
        if(dirExists(`${process.cwd()}/${projectName}`)) {
            return console.log(chalk.red(`Directory ${projectName} is already exists in the current directory.`));
        }
        mkdirSync(`${process.cwd()}/${projectName}`);
        this.createDirectoryContents(this.projectPath, projectName);
        const packageJson = JSON.parse(readFileSync(`${process.cwd()}/${projectName}/package.json`, 'utf-8'));
        packageJson.name = projectName.toLowerCase();
        writeFileSync(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(packageJson, null, 4));
        console.log(chalk.green(`Created project's files.`));

        const npmCmd = platform().startsWith('win') ? 'npm.cmd' : 'npm';
        spawnSync(npmCmd, ['i'], { env: process.env, cwd: `${process.cwd()}/${projectName}`, stdio: 'inherit'});
        console.log(chalk.green(`Project ${projectName} was successfully created`));
    }

    handle(projectName: string): void {
        this.generateProject(projectName);
        process.exit();
    }
}

export const newHandler = new NewHandler();