"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var os_1 = require("os");
var utils_1 = require("../utils/utils");
var NewHandler = /** @class */ (function () {
    function NewHandler() {
        this.projectPath = path_1.resolve(__dirname, '../assets/project');
    }
    NewHandler.prototype.createDirectoryContents = function (projectPath, projectName) {
        var _this = this;
        var filesToCreate = fs_1.readdirSync(projectPath);
        filesToCreate.forEach(function (file) {
            var origFilePath = projectPath + "/" + file;
            var stats = fs_1.statSync(origFilePath);
            if (stats.isFile()) {
                var contents = fs_1.readFileSync(origFilePath, 'utf8');
                var writePath = process.cwd() + "/" + projectName + "/" + file;
                fs_1.writeFileSync(writePath, contents, 'utf8');
            }
            else if (stats.isDirectory()) {
                fs_1.mkdirSync(process.cwd() + "/" + projectName + "/" + file);
                _this.createDirectoryContents(projectPath + "/" + file, projectName + "/" + file);
            }
        });
    };
    NewHandler.prototype.generateProject = function (projectName) {
        if (utils_1.dirExists(process.cwd() + "/" + projectName)) {
            return console.log(chalk_1.default.red("Directory " + projectName + " is already exists in the current directory."));
        }
        fs_1.mkdirSync(process.cwd() + "/" + projectName);
        this.createDirectoryContents(this.projectPath, projectName);
        var packageJson = JSON.parse(fs_1.readFileSync(process.cwd() + "/" + projectName + "/package.json", 'utf-8'));
        packageJson.name = projectName.toLowerCase();
        fs_1.writeFileSync(process.cwd() + "/" + projectName + "/package.json", JSON.stringify(packageJson, null, 4));
        console.log(chalk_1.default.green("Created project's files."));
        var npmCmd = os_1.platform().startsWith('win') ? 'npm.cmd' : 'npm';
        child_process_1.spawnSync(npmCmd, ['i'], { env: process.env, cwd: process.cwd() + "/" + projectName, stdio: 'inherit' });
        console.log(chalk_1.default.green("Project " + projectName + " was successfully created"));
    };
    NewHandler.prototype.handle = function (projectName) {
        this.generateProject(projectName);
        process.exit();
    };
    return NewHandler;
}());
exports.newHandler = new NewHandler();
