"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var os_1 = require("os");
var fs_extra_1 = require("fs-extra");
var utils_1 = require("../utils/utils");
var config_1 = require("../config/config");
var NewHandler = /** @class */ (function () {
    function NewHandler() {
    }
    NewHandler.prototype.copyProject = function (projectName) {
        try {
            fs_extra_1.copySync(config_1.PROJECT_CONFIG.PROJECT_PATH, process.cwd() + "/" + projectName);
        }
        catch (err) {
            console.error(err);
        }
    };
    NewHandler.prototype.generateProject = function (projectName, skipInstall) {
        if (skipInstall === void 0) { skipInstall = false; }
        if (utils_1.dirExists(process.cwd() + "/" + projectName)) {
            return console.log(chalk_1.default.red("Directory " + projectName + " is already exists in the current directory."));
        }
        fs_1.mkdirSync(process.cwd() + "/" + projectName);
        this.copyProject(projectName);
        var packageJson = JSON.parse(fs_1.readFileSync(process.cwd() + "/" + projectName + "/package.json", 'utf-8'));
        packageJson.name = projectName.toLowerCase();
        fs_1.writeFileSync(process.cwd() + "/" + projectName + "/package.json", JSON.stringify(packageJson, null, 4));
        console.log(chalk_1.default.green("Created project's files."));
        if (skipInstall) {
            var npmCmd = os_1.platform().startsWith('win') ? 'npm.cmd' : 'npm';
            child_process_1.spawnSync(npmCmd, ['i'], { env: process.env, cwd: process.cwd() + "/" + projectName, stdio: 'inherit' });
        }
        console.log(chalk_1.default.green("Project " + projectName + " was successfully created"));
    };
    NewHandler.prototype.handle = function (projectName, skipInstall) {
        if (skipInstall && skipInstall === 'skip-install') {
            this.generateProject(projectName);
        }
        else {
            this.generateProject(projectName, true);
        }
        process.exit();
    };
    return NewHandler;
}());
exports.newHandler = new NewHandler();
