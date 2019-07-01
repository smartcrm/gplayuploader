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
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var adbkit_apkreader_1 = __importDefault(require('adbkit-apkreader'));
var fs_1 = require('fs');
var googleapis_1 = require('googleapis');
var GPlayUploader = /** @class */ (function() {
    function GPlayUploader(gPlayUploaderConfig) {
        this.packageName = '';
        this.versionCodes = [];
        this.editId = '';
        this._gPlayUploaderConfig = gPlayUploaderConfig;
    }
    GPlayUploader.prototype.start = function() {
        return __awaiter(this, void 0, void 0, function() {
            var _a, error_1;
            var _this = this;
            return __generator(this, function(_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.parseManifest()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.authenticate()];
                    case 2:
                        _a.publisher = _b.sent();
                        return [4 /*yield*/, this.createEdit()];
                    case 3:
                        _b.sent();
                        return [
                            4 /*yield*/,
                            this.uploadMultiplePaths(this._gPlayUploaderConfig.apkFilePaths, function(apkFilePath) {
                                return _this.uploadSingleAPK(apkFilePath);
                            })
                        ];
                    case 4:
                        _b.sent();
                        return [
                            4 /*yield*/,
                            this.uploadMultiplePaths(this._gPlayUploaderConfig.obbFilePaths, function(obbFilePath) {
                                return _this.uploadSingleOBB(obbFilePath);
                            })
                        ];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.assignTrackAndReleaseNotes()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.commitChanges()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        throw new Error(error_1);
                    case 9:
                        return [2 /*return*/];
                }
            });
        });
    };
    GPlayUploader.prototype.parseManifest = function() {
        return __awaiter(this, void 0, void 0, function() {
            var reader, manifest;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Parsing manifest');
                        return [
                            4 /*yield*/,
                            adbkit_apkreader_1.default.open(this._gPlayUploaderConfig.apkFilePaths[0])
                        ];
                    case 1:
                        reader = _a.sent();
                        return [4 /*yield*/, reader.readManifest()];
                    case 2:
                        manifest = _a.sent();
                        this.packageName = manifest.package;
                        this._logger('> Detected package name ' + this.packageName);
                        return [2 /*return*/, manifest];
                }
            });
        });
    };
    GPlayUploader.prototype.authenticate = function() {
        return __awaiter(this, void 0, void 0, function() {
            var client, publisher;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Authenticating');
                        return [
                            4 /*yield*/,
                            googleapis_1.google.auth.getClient({
                                keyFile: this._gPlayUploaderConfig.authenticationPath,
                                scopes: 'https://www.googleapis.com/auth/androidpublisher'
                            })
                        ];
                    case 1:
                        client = _a.sent();
                        publisher = googleapis_1.google.androidpublisher({
                            version: 'v3',
                            auth: client
                        });
                        this._logger('> Authenticated succesfully');
                        return [2 /*return*/, publisher];
                }
            });
        });
    };
    GPlayUploader.prototype.createEdit = function() {
        return __awaiter(this, void 0, void 0, function() {
            var edit;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Creating edit');
                        return [4 /*yield*/, this.publisher.edits.insert({ packageName: this.packageName })];
                    case 1:
                        edit = _a.sent();
                        this.editId = edit.data.id;
                        this._logger('> Created edit with id ' + this.editId);
                        return [2 /*return*/, edit];
                }
            });
        });
    };
    GPlayUploader.prototype.uploadMultiplePaths = function(pathsToUpload, uploadSinglePathFunction) {
        return __awaiter(this, void 0, void 0, function() {
            var uploadQue;
            return __generator(this, function(_a) {
                uploadQue = [];
                pathsToUpload.forEach(function(filePath) {
                    var newUpload = uploadSinglePathFunction(filePath);
                    uploadQue.push(newUpload);
                });
                return [2 /*return*/, Promise.all(uploadQue)];
            });
        });
    };
    GPlayUploader.prototype.uploadSingleAPK = function(apkFilePath) {
        return __awaiter(this, void 0, void 0, function() {
            var uploadApkConfig, apkUpload;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Uploading APK');
                        uploadApkConfig = {
                            packageName: this.packageName,
                            editId: this.editId,
                            media: {
                                mimeType: 'application/vnd.android.package-archive',
                                body: fs_1.createReadStream(apkFilePath)
                            }
                        };
                        return [4 /*yield*/, this.publisher.edits.apks.upload(uploadApkConfig)];
                    case 1:
                        apkUpload = _a.sent();
                        this.versionCodes.push(apkUpload.data.versionCode);
                        this._logger(
                            '> Uploaded ' +
                                apkFilePath +
                                ' with version code ' +
                                apkUpload.data.versionCode +
                                ' and SHA1 ' +
                                apkUpload.data.binary.sha1
                        );
                        return [2 /*return*/, apkUpload];
                }
            });
        });
    };
    GPlayUploader.prototype.uploadSingleOBB = function(obbFilePath) {
        return __awaiter(this, void 0, void 0, function() {
            var obbUploadConfig, obbUpload;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Uploading  expansion file(s)');
                        obbUploadConfig = {
                            packageName: this.packageName,
                            editId: this.editId,
                            // TODO: find out a petter way to set up the right versioncodes.
                            apkVersionCode: this.versionCodes[0],
                            expansionFileType: 'main',
                            media: {
                                mimeType: 'application/octet-stream',
                                body: fs_1.createReadStream(obbFilePath)
                            }
                        };
                        return [4 /*yield*/, this.publisher.edits.expansionfiles.upload(obbUploadConfig)];
                    case 1:
                        obbUpload = _a.sent();
                        return [2 /*return*/, obbUpload];
                }
            });
        });
    };
    GPlayUploader.prototype.assignTrackAndReleaseNotes = function() {
        return __awaiter(this, void 0, void 0, function() {
            var newTrackConfig, newTrack;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Assigning APK to ' + this._gPlayUploaderConfig.track + ' track');
                        newTrackConfig = {
                            packageName: this.packageName,
                            editId: this.editId,
                            track: this._gPlayUploaderConfig.track,
                            resource: {
                                track: this._gPlayUploaderConfig.track,
                                releases: [
                                    {
                                        versionCodes: this.versionCodes,
                                        releaseNotes: this.getReleaseNotes(),
                                        status: 'completed'
                                    }
                                ]
                            }
                        };
                        return [4 /*yield*/, this.publisher.edits.tracks.update(newTrackConfig)];
                    case 1:
                        newTrack = _a.sent();
                        this._logger('> Assigned APK to ' + newTrack.track + ' track');
                        return [2 /*return*/, newTrack];
                }
            });
        });
    };
    GPlayUploader.prototype.getReleaseNotes = function() {
        var newReleaseNotes = [];
        this._logger('> Adding release notes');
        return newReleaseNotes;
    };
    GPlayUploader.prototype.commitChanges = function() {
        return __awaiter(this, void 0, void 0, function() {
            var commitedChanges;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        this._logger('> Commiting changes');
                        return [
                            4 /*yield*/,
                            this.publisher.edits.commit({
                                editId: this.editId,
                                packageName: this.packageName
                            })
                        ];
                    case 1:
                        commitedChanges = _a.sent();
                        this._logger('> Commited changes');
                        return [2 /*return*/, commitedChanges];
                }
            });
        });
    };
    GPlayUploader.prototype._logger = function(message) {
        console.log(message);
    };
    return GPlayUploader;
})();
exports.GPlayUploader = GPlayUploader;
//# sourceMappingURL=GPlayUploader.js.map
