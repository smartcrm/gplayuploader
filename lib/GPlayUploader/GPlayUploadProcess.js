'use strict';
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
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
var GPlayUploadProcess = /** @class */ (function() {
    function GPlayUploadProcess(manifestParser, editCreator, fileUploader, uploadCompleter) {
        this.manifestParser = manifestParser;
        this.editCreator = editCreator;
        this.fileUploader = fileUploader;
        this.uploadCompleter = uploadCompleter;
    }
    GPlayUploadProcess.prototype.start = function(uploaderConfig) {
        return __awaiter(this, void 0, void 0, function() {
            var packageName,
                editId,
                uploadParameters,
                uploadResults,
                obbUploadParameters,
                trackUpdateParameters,
                error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [
                            4 /*yield*/,
                            this.manifestParser.getPackageNameFromManifest(uploaderConfig.filePaths[0])
                        ];
                    case 1:
                        packageName = _a.sent();
                        return [4 /*yield*/, this.editCreator.getEditId(packageName)];
                    case 2:
                        editId = _a.sent();
                        uploadParameters = { packageName: packageName, editId: editId };
                        return [
                            4 /*yield*/,
                            this.fileUploader.uploadAppPaths(uploaderConfig.filePaths, uploadParameters)
                        ];
                    case 3:
                        uploadResults = _a.sent();
                        obbUploadParameters = __assign({}, uploadParameters, {
                            versionCodes: GPlayUploadProcess.getVersionCodesFromUploadResults(uploadResults)
                        });
                        return [
                            4 /*yield*/,
                            this.fileUploader.uploadObbFilePaths(uploaderConfig.obbFilePaths, obbUploadParameters)
                        ];
                    case 4:
                        _a.sent();
                        trackUpdateParameters = __assign({}, obbUploadParameters, { track: uploaderConfig.track });
                        return [4 /*yield*/, this.uploadCompleter.assignTrackAndReleaseNotes(trackUpdateParameters)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.uploadCompleter.commitChanges(uploadParameters)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw error_1;
                    case 8:
                        return [2 /*return*/];
                }
            });
        });
    };
    GPlayUploadProcess.getVersionCodesFromUploadResults = function(uploadResults) {
        return uploadResults.map(function(uploadResult) {
            return uploadResult.versionCode;
        });
    };
    return GPlayUploadProcess;
})();
exports.GPlayUploadProcess = GPlayUploadProcess;
//# sourceMappingURL=GPlayUploadProcess.js.map
