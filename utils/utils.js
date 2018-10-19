"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
function fileExists(filename) {
    try {
        return fs_1.statSync(filename).isFile();
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
function dirExists(dirname) {
    try {
        return fs_1.statSync(dirname).isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.dirExists = dirExists;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
