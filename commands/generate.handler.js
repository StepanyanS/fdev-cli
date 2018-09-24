"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var utils_1 = require("../utils/utils");
var GenerateHandler = /** @class */ (function () {
    function GenerateHandler() {
    }
    GenerateHandler.prototype.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    GenerateHandler.prototype.getModuleData = function (moduleFile) {
        var data = fs_1.readFileSync(moduleFile, { encoding: 'utf-8' });
        data = data.replace(/(\r\n|\n|\r|\s)/gm, "");
        return data.slice(data.indexOf('[') + 1, data.indexOf(']'));
    };
    GenerateHandler.prototype.writeData = function (moduleFile, moduleData, generatingFile) {
        var writeData = '';
        if (this.getModuleData(moduleFile).length === 0) {
            writeData = moduleData[0] + "\t'" + generatingFile + "'" + moduleData[1];
        }
        else {
            var data = this.getModuleData(moduleFile).split('\'').filter(function (item) {
                return item !== ',' && item !== '' && item !== '//' && item !== ',//';
            });
            writeData = "" + moduleData[0];
            data.forEach(function (item) { return writeData += "\t'" + item + "',\n"; });
            writeData += "\t'" + generatingFile + "'" + moduleData[1];
        }
        fs_1.writeFileSync(moduleFile, writeData);
    };
    GenerateHandler.prototype.updateProvider = function (type, file) {
        if (type === 'component') {
            var moduleFile = 'components/components.ts';
            var moduleData = ['const components = [\n', '\n];\n\nmodule.exports = components;'];
            this.writeData(moduleFile, moduleData, file);
        }
        else if (type === 'page') {
            var moduleFile = 'pages/pages.ts';
            var moduleData = ['const pages = [\n', '\n];\n\nexport default pages;'];
            this.writeData(moduleFile, moduleData, file);
        }
    };
    GenerateHandler.prototype.generateComponent = function (component) {
        if (utils_1.fileExists("components/" + component + ".component.html")) {
            console.log(chalk_1.default.red("Component \"" + component + "\" is already exist."));
            process.exit();
        }
        else {
            var writeData = "<p>" + this.capitalize(component) + " works!</p>";
            fs_1.writeFileSync("components/" + component + ".component.html", writeData, { encoding: 'utf-8' });
            this.updateProvider('component', component);
            console.log(chalk_1.default.green('Create'), "components/" + component + ".html");
            console.log(chalk_1.default.blue('Update'), 'components/components.ts');
        }
    };
    GenerateHandler.prototype.generatePage = function (page) {
        if (utils_1.fileExists("pages/" + page + ".html")) {
            console.log(chalk_1.default.red("Page \"" + page + "\" is already exist."));
        }
        else {
            var writeData = "<!DOCTYPE html>\n    <html>\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <title>" + this.capitalize(page) + "</title>\n    </head>\n    <body>\n    \n        <h1>" + this.capitalize(page) + " works!</h1>\n        \n    </body>\n    </html>";
            fs_1.writeFileSync("pages/" + page + ".html", writeData, { encoding: 'utf-8' });
            this.updateProvider('page', page);
            console.log(chalk_1.default.green('Create'), "pages/" + page + ".html");
            console.log(chalk_1.default.blue('Update'), 'pages/pages.js');
        }
    };
    GenerateHandler.prototype.handle = function (generateType, generateFile) {
        if (generateType === 'component' || generateType === 'c') {
            this.generateComponent(generateFile);
        }
        else if (generateType === 'page' || generateType === 'p') {
            this.generatePage(generateFile);
        }
        else {
            console.log(chalk_1.default.red("\"" + generateType + "\" isn't a schematic for \"generate\" command. For a list of available options, run \"fdev help\"."));
        }
        process.exit();
    };
    return GenerateHandler;
}());
exports.generateHandler = new GenerateHandler();
