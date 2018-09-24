import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';

import { fileExists } from '../utils/utils';
import { IHandler } from '../models/handler';

class GenerateHandler implements IHandler {

    private capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private getModuleData(moduleFile: string): string {
        let data = readFileSync(moduleFile, { encoding: 'utf-8' });
        data = data.replace(/(\r\n|\n|\r|\s)/gm,"");
        return data.slice(data.indexOf('[') + 1, data.indexOf(']'));
    }

    private writeData(moduleFile: string, moduleData: string[], generatingFile: string): void {
        let writeData = '';
        if(this.getModuleData(moduleFile).length === 0) {
            writeData = `${moduleData[0]}\t'${generatingFile}'${moduleData[1]}`;
        }
        else {
            const data = this.getModuleData(moduleFile).split('\'').filter((item) => {
                return item !== ',' && item !== '' && item !== '//' && item !== ',//'
            });
            writeData = `${moduleData[0]}`;
            data.forEach(item => writeData +=`\t'${item}',\n`);
            writeData += `\t'${generatingFile}'${moduleData[1]}`
        }
        writeFileSync(moduleFile, writeData);
    }

    private updateProvider(type: string, file: string): void {
        if(type === 'component') {
            const moduleFile = 'components/components.ts';
            const moduleData = ['const components = [\n', '\n];\n\nmodule.exports = components;'];
            this.writeData(moduleFile, moduleData, file);
        }
        else if(type === 'page') {
            const moduleFile = 'pages/pages.ts';
            const moduleData = ['const pages = [\n', '\n];\n\nexport default pages;'];
            this.writeData(moduleFile, moduleData, file);
        }
    }

    private generateComponent(component: string): void {
        if(fileExists(`components/${component}.component.html`)) {
            console.log(chalk.red(`Component "${component}" is already exist.`));
            process.exit();
        }
        else {
            const writeData = `<p>${this.capitalize(component)} works!</p>`;
            writeFileSync(`components/${component}.component.html`, writeData, {encoding: 'utf-8'})
            this.updateProvider('component', component);
            console.log(chalk.green('Create'), `components/${component}.html`);
            console.log(chalk.blue('Update'), 'components/components.ts');
        }
    }

    private generatePage(page: string): void {
        if(fileExists(`pages/${page}.html`)) {
            console.log(chalk.red(`Page "${page}" is already exist.`));
        }
        else {
            const writeData = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${this.capitalize(page)}</title>
    </head>
    <body>
    
        <h1>${this.capitalize(page)} works!</h1>
        
    </body>
    </html>`;
            writeFileSync(`pages/${page}.html`, writeData, {encoding: 'utf-8'});
            this.updateProvider('page', page);
            console.log(chalk.green('Create'), `pages/${page}.html`);
            console.log(chalk.blue('Update'), 'pages/pages.js');
        }
    }

    public handle(generateType: string, generateFile: string): void {
        if(generateType === 'component' || generateType === 'c') {
            if(!generateFile) {
                console.log(chalk.red(`You must specify component name`));
                process.exit();
            }
            this.generateComponent(generateFile);
        }
        else if(generateType === 'page' || generateType === 'p') {
            if(!generateFile) {
                console.log(chalk.red(`You must specify page name`));
                process.exit();
            }
            this.generatePage(generateFile);
        }
        else {
            console.log(chalk.red(`"${generateType}" isn't a schematic for "generate" command. For a list of available options, run "fdev help".`));
        }
        process.exit();
    }
}

export const generateHandler = new GenerateHandler();