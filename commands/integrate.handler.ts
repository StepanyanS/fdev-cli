import { createReadStream, writeFileSync, mkdirSync, createWriteStream } from 'fs';
import { Parse } from 'unzip';
import chalk from 'chalk';
import { IHandler } from '../models/handler';
import { dirExists, fileExists } from '../utils/utils';

class IntegrateHandler implements IHandler {

    private getFontsPath(projectName: string): string {
        return `${process.cwd()}/src/assets/fonts/${projectName}`;
    }

    private getStylesPath(projectName: string): string {
        return `${process.cwd()}/src/assets/scss/assets/${projectName}/`;
    }

    private getFileName(entryName: string): string {
        return entryName.lastIndexOf('/') !== -1 ? entryName.slice(entryName.lastIndexOf('/') + 1) : entryName;
    }

    private getVariablesData(data: Buffer): string {
        return data.toString('utf-8').split('$icomoon-font-path: "fonts" !default;')[1].replace(/(\n)/gm, "");
    }

    private getStylesData(data: Buffer): string {
        let stylesString = data.toString('utf-8');
        return '@import "./variables";\n\n' + stylesString.slice(stylesString.indexOf('[class'))
                .replace("font-family: '#{$icomoon-font-family}' !important;", "font-family: $font-icons !important;");
    } 

    public handle(projectName: string): void {
        if(!projectName) {
            console.log(chalk.red('You must specify icomoon project name'));
            process.exit();
        }
        if(projectName.indexOf('.zip') !== -1) {
            projectName = projectName.slice(0, -4);
        }
        if(!fileExists(`${projectName}.zip`)) {
            console.log(chalk.red('Icomoon project doesn\'t exists'));
            process.exit();
        }
        const readStream = createReadStream(`${process.cwd()}/${projectName}.zip`);
        readStream.pipe(Parse()).on('entry', (entry) => {
            const entryName = entry.path;
            if(entryName.indexOf(`fonts/${projectName}`) != -1 || entryName === 'selection.json') {
                if(!dirExists(this.getFontsPath(projectName))) {
                    mkdirSync(this.getFontsPath(projectName));
                }
                entry.pipe(createWriteStream(`${this.getFontsPath(projectName)}/${this.getFileName(entryName)}`));
            } else if(entryName === 'variables.scss') {
                entry.on('data', (data) => {
                    if(!dirExists(this.getStylesPath(projectName))) {
                        mkdirSync(this.getStylesPath(projectName));
                    }
                    writeFileSync(`${this.getStylesPath(projectName)}/_variables.scss`, this.getVariablesData(data));
                });
            } else if(entryName === 'style.scss') {
                entry.on('data', (data) => {
                    
                    if(!dirExists(this.getStylesPath(projectName))) {
                        mkdirSync(this.getStylesPath(projectName));
                    }
                    writeFileSync(`${this.getStylesPath(projectName)}/_style.scss`, this.getStylesData(data));
                });
            } else {
                entry.autodrain();
            }
        }).on('close', () => {
            console.log(chalk.green('Inttegrated successfully!'));
            process.exit();
        })
    }
}

export const integrateHandler = new IntegrateHandler();