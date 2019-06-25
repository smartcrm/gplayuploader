#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var GPlayUploaderConfig_1 = require("./GPlayUploader/GPlayUploaderConfig");
var GPlayUploader_1 = require("./GPlayUploader/GPlayUploader");
var CLIRunner = /** @class */ (function () {
    function CLIRunner() {
    }
    CLIRunner.run = function () {
        var _cliRunner = new CLIRunner();
        _cliRunner.main();
    };
    CLIRunner.prototype.main = function () {
        var program = this.configureProgram();
        this.runGPlayUploader(this.getConfig(program));
    };
    CLIRunner.prototype.configureProgram = function () {
        var program = new commander_1.Command();
        program
            .description('How to use gplayuploader')
            .option('-c, --configFile <file>', 'Configuration file for gplayuploader', '.gplayuploader.config.json')
            .option('-t, --track [track]', "Track for uploading. Available tracks: " + GPlayUploaderConfig_1.GPlayUploaderConfig.allowedTracks)
            .option('-a, --authentication <path/to/authentication.json>', 'JSON file that contains private key and client email')
            .option('-r, --recentChanges [message]', 'Recent changes message', this.collectParameterValues)
            .option('-f, --apkFiles <path/to.apk>', 'APK to upload', this.collectParameterValues)
            .option('-o, --obbFiles <path/to.obb>..<path/to.obb>', 'OBB to upload', this.collectParameterValues)
            // .option('-l, --logLevel', 'Sets log level')


            
            .parse(process.argv);
        return program;
    };
    CLIRunner.prototype.collectParameterValues = function (value, previous) {
        if (!Array.isArray(previous)) {
            previous = [];
        }
        return previous.concat([value]);
    };
    CLIRunner.prototype.getConfig = function (parameters) {
        var config = new GPlayUploaderConfig_1.GPlayUploaderConfig(parameters);
        return config;
    };
    CLIRunner.prototype.runGPlayUploader = function (config) {
        var gPlayUploader = new GPlayUploader_1.GPlayUploader(config);
        gPlayUploader.start();
    };
    return CLIRunner;
}());
CLIRunner.run();
//# sourceMappingURL=cli.js.map