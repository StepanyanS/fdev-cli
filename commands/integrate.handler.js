"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var unzip_1 = require("unzip");
var chalk_1 = require("chalk");
var utils_1 = require("../utils/utils");
var IntegrateHandler = /** @class */ (function () {
    function IntegrateHandler() {
    }
    IntegrateHandler.prototype.getFontsPath = function (projectName) {
        return process.cwd() + "/src/assets/fonts/" + projectName;
    };
    IntegrateHandler.prototype.getStylesPath = function (projectName) {
        return process.cwd() + "/src/assets/scss/assets/" + projectName + "/";
    };
    IntegrateHandler.prototype.getFileName = function (entryName) {
        return entryName.lastIndexOf('/') !== -1 ? entryName.slice(entryName.lastIndexOf('/') + 1) : entryName;
    };
    IntegrateHandler.prototype.getVariablesData = function (data) {
        return data.toString('utf-8').split('$icomoon-font-path: "fonts" !default;')[1].replace(/(\n)/gm, "");
    };
    IntegrateHandler.prototype.getStylesData = function (data) {
        var stylesString = data.toString('utf-8');
        return '@import "./variables";\n\n' + stylesString.slice(stylesString.indexOf('[class'))
            .replace("font-family: '#{$icomoon-font-family}' !important;", "font-family: $font-icons !important;");
    };
    IntegrateHandler.prototype.handle = function (projectName) {
        var _this = this;
        if (!projectName) {
            console.log(chalk_1["default"].red('You must specify icomoon project name'));
            process.exit();
        }
        if (projectName.indexOf('.zip') !== -1) {
            projectName = projectName.slice(0, -4);
        }
        if (!utils_1.fileExists(projectName + ".zip")) {
            console.log(chalk_1["default"].red('Icomoon project doesn\'t exists'));
            process.exit();
        }
        var readStream = fs_1.createReadStream(process.cwd() + "/" + projectName + ".zip");
        readStream.pipe(unzip_1.Parse()).on('entry', function (entry) {
            var entryName = entry.path;
            if (entryName.indexOf("fonts/" + projectName) != -1 || entryName === 'selection.json') {
                if (!utils_1.dirExists(_this.getFontsPath(projectName))) {
                    fs_1.mkdirSync(_this.getFontsPath(projectName));
                }
                entry.pipe(fs_1.createWriteStream(_this.getFontsPath(projectName) + "/" + _this.getFileName(entryName)));
            }
            else if (entryName === 'variables.scss') {
                entry.on('data', function (data) {
                    if (!utils_1.dirExists(_this.getStylesPath(projectName))) {
                        fs_1.mkdirSync(_this.getStylesPath(projectName));
                    }
                    fs_1.writeFileSync(_this.getStylesPath(projectName) + "/_variables.scss", _this.getVariablesData(data));
                });
            }
            else if (entryName === 'style.scss') {
                entry.on('data', function (data) {
                    if (!utils_1.dirExists(_this.getStylesPath(projectName))) {
                        fs_1.mkdirSync(_this.getStylesPath(projectName));
                    }
                    fs_1.writeFileSync(_this.getStylesPath(projectName) + "/_style.scss", _this.getStylesData(data));
                });
            }
            else {
                entry.autodrain();
            }
        }).on('close', function () {
            console.log(chalk_1["default"].green('Inttegrated successfully!'));
            process.exit();
        });
    };
    return IntegrateHandler;
}());
exports.integrateHandler = new IntegrateHandler();
