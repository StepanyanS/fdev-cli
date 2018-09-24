import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { watch } from 'chokidar';

export class ComponentsProvider {
    // define components file path
    componentsFile = resolve(__dirname, '../../src/components/components.ts');

    // define components module file path
    componentsModulePath = resolve(__dirname, '../../client/componentsModule.js');

    // define components path
    componentsPath = '../src/components/';

    // import components
    components: string[];

    // define generated components file path
    generatedComponentsFile = resolve(__dirname, '../../client/components.js');

    private getModuleData(moduleFile: string): string[] {
        let data = readFileSync(moduleFile, { encoding: 'utf-8' }).replace(/(\r\n|\n|\r|\s)/gm,"");
        return data.slice(data.indexOf('[') + 1, data.indexOf(']')).split('\'').filter((item) => {
            return item !== ',' && item !== '' && item !== '//' && item !== ',//'
        });
    }

    private capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private generateComponentName(component: string): string {
        let componentName = component.split('-').reduce((x, y, i) => {
            if(i > 0) return x + this.capitalize(y);
        });

        componentName += 'Component';

        return componentName;
    }

    private getRequireCode(): { requireStr: string, writeCode: string, consoleStr: string } {

        this.components = this.getModuleData(this.componentsFile);

        // define string for require in components module
        let requireStr = '';

        // define string for console.log
        let consoleStr = '';

        let writeCode = '';

        if(this.components.length != 0) {
            consoleStr = 'Component(s) (';
            
            let componentsObject = 'const components = {\n\t';
            
            let importCode = `// import components from componentns module\nconst componentsPath = './componentsModule.js';\nimport components from './componentsModule.js';\n\n`;
            let classCode = '';
            let customElementsDefine = '// define custom elements\n';
            let deleteRequireCache = `\n// delete require Cache\ndelete require.cache[componentsPath];`;

            for(let component of this.components) {
                componentsObject += `'${component}': ${this.generateComponentName(component)},\n\t`;
                requireStr += `const ${this.generateComponentName(component)} = require('${this.componentsPath}${component}.component.html');\n`;
                classCode += `class ${this.capitalize(this.generateComponentName(component))} extends HTMLElement {\n\n\tconstructor() {\n\t\tsuper();\n\t}\n\n\tconnectedCallback() {\n\t\tthis.innerHTML = components['${component}'];\n\t}\n}\n\n`;
                customElementsDefine += `customElements.define('app-${component}', ${this.capitalize(this.generateComponentName(component))});\n`;
                consoleStr += `${component}, `;
            }
            componentsObject = componentsObject.slice(0, -3) + '\n}';
            requireStr += `\n${componentsObject};\n\nexport default components;`;
            writeCode = importCode + classCode + customElementsDefine + deleteRequireCache;
            consoleStr  = consoleStr.slice(0, -2) + `) imported\n`;
        }

        return {
            requireStr,
            writeCode,
            consoleStr
        }
    }

    private writeFile(): void {
        let { requireStr, writeCode, consoleStr } = this.getRequireCode();

        // write require string in the components module
        writeFileSync(this.componentsModulePath, requireStr)

        // write code in the client/components.js
        writeFileSync(this.generatedComponentsFile, writeCode);

        // console.log(consoleStr);
    }

    public provide(): void {
        this.writeFile();
        watch(this.componentsFile, { usePolling: true }).on('change', this.writeFile.bind(this));
    }
}