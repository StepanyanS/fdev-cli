// import "fs(file system)" module
import fs from 'fs';

// import pages array from pages file
import pages from '../src/pages/pages.js';

// import "path" plugin
import path from 'path';

export default class RequirePages {
    constructor() {
        this.init();
        this.writeFile();
    }

    init() {
        // define pages module file path
        this.pagesModule = path.resolve(__dirname, '../client/pagesModule.js');

        // define pages path
        this.pagesPath = '../src/pages/';
    }

    getRequireCode() {

        // define string for require in pages module
        let requireStr = `require('../src/index.html');\n`;

        // define string for console.log
        let consoleStr = 'index';

        if(pages.length == 0) {
            consoleStr = '\n' + consoleStr + ' page imported\n';
        }
        else {
            for(let page of pages) {
                requireStr += `require('${this.pagesPath}${page}.html');\n`;
                consoleStr += `, ${page}`;
            }

            consoleStr = `\npages (${consoleStr}) imported\n`;
        }

        return {
            requireStr,
            consoleStr
        }
    }

    writeFile() {

        let { requireStr, consoleStr } = this.getRequireCode();

        // write html's requires in the module.js
        fs.writeFile(this.pagesModule, requireStr, function(error) {
            if(error) throw new Error(error);
        });

        console.log(consoleStr);
    }
}