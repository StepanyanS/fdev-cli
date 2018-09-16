// import "fs(file system)" module
import fs from 'fs';

// import "path" plugin
import path from 'path';

// define components file path
const componentsFile = path.resolve(__dirname, '../src/components/components.js');

// define generated components file path
const generatedComponentsFile = path.resolve(__dirname, '../client/components.js');

export default class RequireComponents {
    constructor() {
        this.init();
        this.writeFile();
    }

    init() {
        // define components module file path
        this.componentsModule = path.resolve(__dirname, '../client/componentsModule.js');

        // define components path
        this.componentsPath = '../src/components/';

        // // import components
        // this.components = components;
        this.components = require('../src/components/components.js');
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    generateComponentName(component) {
        let componentName = component.split('-').reduce((x, y, i) => {
            if(i > 0) return x + this.capitalize(y);
        });

        componentName += 'Component';

        return componentName;
    }

    getRequireCode() {

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

    writeFile() {
        let { requireStr, writeCode, consoleStr } = this.getRequireCode();

        // write require string in the components module
        fs.writeFile(this.componentsModule, requireStr, function(error) {
            if(error) throw new Error(error);
        });

        // write code in the client/components.js
        fs.writeFile(generatedComponentsFile, writeCode, function(error) {
            if(error) throw new Error(error);
        });

        console.log(consoleStr);

        // delete require cache to refresh components array
        delete require.cache[componentsFile];
    }
}