import pages from '../../src/pages/pages';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

export class PagesProvider {

    // define pages module file path
    private pagesModulePath = resolve(__dirname, '../../client/pagesModule.js');
    // define pages path
    private pagesPath = '../src/pages/';

    private getRequireCode(): { requireStr: string, consoleStr: string } {

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

    private writeFile(): void {

        let { requireStr, consoleStr } = this.getRequireCode();

        // write html's requires in the module.js
        writeFileSync(this.pagesModulePath, requireStr);
        // console.log(consoleStr);
    }

    provide(): void {
        this.writeFile();
    }
}