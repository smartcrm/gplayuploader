#!/usr/bin/env node
'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function(v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(exports, '__esModule', { value: true });
var commander_1 = require('commander');
var GPlayUploaderConfig_1 = require('./GPlayUploader/GPlayUploaderConfig');
var GPlayUploadProcess_1 = require('./GPlayUploader/GPlayUploadProcess');
var GPlayAuthenticatorV3_1 = require('./GPlayUploader/AndroidPublisherAPI/Implementations/GPlayAuthenticatorV3');
var GPlayEditCreator_1 = require('./GPlayUploader/UploadSteps/GPlayEditCreator');
var GPlayUploadCompleter_1 = require('./GPlayUploader/UploadSteps/GPlayUploadCompleter');
var ManifestParser_1 = require('./GPlayUploader/UploadSteps/ManifestParser');
var GPlayFileUploader_1 = require('./GPlayUploader/UploadSteps/GPlayFileUploader');
var CLIRunner = /** @class */ (function() {
    function CLIRunner() {}
    CLIRunner.run = function() {
        return __awaiter(this, void 0, void 0, function() {
            var _cliRunner, error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _cliRunner = new CLIRunner();
                        return [4 /*yield*/, _cliRunner.main()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    };
    // Main method of the application
    CLIRunner.prototype.main = function() {
        return __awaiter(this, void 0, void 0, function() {
            var program, config, error_2;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        program = CLIRunner.configureProgram();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        config = CLIRunner.getConfig(program);
                        if (!config.isValidConfig()) return [3 /*break*/, 3];
                        return [4 /*yield*/, CLIRunner.runGPlayUploader(config)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        program.outputHelp();
                        throw error_2;
                    case 5:
                        return [2 /*return*/];
                }
            });
        });
    };
    CLIRunner.configureProgram = function() {
        var program = new commander_1.Command();
        program
            .description('How to use gplayuploader')
            // .option('-c, --configFilePath <file>', 'Configuration file for gplayuploader')
            .option(
                '-t, --track [track]',
                'Track for uploading. Available tracks: ' + GPlayUploaderConfig_1.GPlayUploaderConfig.allowedTracks
            )
            .option(
                '-a, --authenticationPath <path/to/authentication.json>',
                'JSON file that contains private key and client email'
            )
            .option('-r, --recentChanges [message]', 'Recent changes message', CLIRunner.collectParameterValues)
            .option(
                '-f, --filePaths <path/to.app>..<path/>to.app>',
                'path to apk or app bundle',
                CLIRunner.collectParameterValues
            )
            .option(
                '-o, --obbFilePaths <path/to.obb>..<path/to.obb>',
                'OBBs to upload (optional)',
                CLIRunner.collectParameterValues
            )
            .option('-p, --rootPath <rootPath>', 'Working path', process.cwd())
            // .option('-l, --logLevel', 'Sets log level')
            .parse(process.argv);
        return program;
    };
    CLIRunner.collectParameterValues = function(value, previous) {
        if (!Array.isArray(previous)) {
            previous = [];
        }
        return previous.concat([value]);
    };
    CLIRunner.getConfig = function(parameters) {
        return new GPlayUploaderConfig_1.GPlayUploaderConfig(parameters);
    };
    // Main method to instantiate GPlayUploadProcess and its dependencies
    CLIRunner.runGPlayUploader = function(config) {
        return __awaiter(this, void 0, void 0, function() {
            var authenticator, publisherAPI, manifestParser, editCreator, fileUploader, uploadCompleter, uploadProcess;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        authenticator = new GPlayAuthenticatorV3_1.GPlayAuthenticatorV3();
                        return [4 /*yield*/, authenticator.authenticate(config.authenticationPath)];
                    case 1:
                        publisherAPI = _a.sent();
                        manifestParser = new ManifestParser_1.ManifestParser();
                        editCreator = new GPlayEditCreator_1.GPlayEditCreator(publisherAPI);
                        fileUploader = new GPlayFileUploader_1.GPlayFileUploader(publisherAPI);
                        uploadCompleter = new GPlayUploadCompleter_1.GPlayUploadCompleter(publisherAPI);
                        uploadProcess = new GPlayUploadProcess_1.GPlayUploadProcess(
                            manifestParser,
                            editCreator,
                            fileUploader,
                            uploadCompleter
                        );
                        return [4 /*yield*/, uploadProcess.start(config)];
                    case 2:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CLIRunner;
})();
CLIRunner.run();
//# sourceMappingURL=cli.js.map
