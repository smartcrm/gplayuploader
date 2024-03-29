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
var Utilities_1 = require('./Utilities/Utilities');
var Utilities_2 = require('../../UploadSteps/Utilities/Utilities');
var AndroidPublisherV3 = /** @class */ (function() {
    function AndroidPublisherV3(publisher, uploadConfigGenerator) {
        this.publisher = publisher;
        this.uploadConfigGenerator = uploadConfigGenerator;
    }
    AndroidPublisherV3.prototype.generateEditId = function(packageName) {
        return __awaiter(this, void 0, void 0, function() {
            var edit;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.publisher.edits.insert({ packageName: packageName })];
                    case 1:
                        edit = _a.sent();
                        return [2 /*return*/, edit.data.id];
                }
            });
        });
    };
    AndroidPublisherV3.prototype.uploadApp = function(filePath, uploadParameters) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                if (Utilities_2.isAABFilePath(filePath)) {
                    return [2 /*return*/, this.uploadBundle(filePath, uploadParameters)];
                }
                return [2 /*return*/, this.uploadAPK(filePath, uploadParameters)];
            });
        });
    };
    AndroidPublisherV3.prototype.uploadObb = function(filePath, uploadParameters) {
        return __awaiter(this, void 0, void 0, function() {
            var obbUploadConfig, obbUpload;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        obbUploadConfig = this.uploadConfigGenerator.generateObbUploadConfig(
                            filePath,
                            uploadParameters
                        );
                        return [4 /*yield*/, this.publisher.edits.expansionfiles.upload(obbUploadConfig)];
                    case 1:
                        obbUpload = _a.sent();
                        return [2 /*return*/, obbUpload.data];
                }
            });
        });
    };
    AndroidPublisherV3.prototype.uploadBundle = function(aabFilePath, uploadParameters) {
        return __awaiter(this, void 0, void 0, function() {
            var uploadAabConfig, uploadResult;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        uploadAabConfig = this.uploadConfigGenerator.generateAppUploadConfig(
                            aabFilePath,
                            uploadParameters
                        );
                        return [4 /*yield*/, this.publisher.edits.bundles.upload(uploadAabConfig)];
                    case 1:
                        uploadResult = _a.sent();
                        return [2 /*return*/, uploadResult.data];
                }
            });
        });
    };
    AndroidPublisherV3.prototype.uploadAPK = function(apkFilePath, uploadParameters) {
        return __awaiter(this, void 0, void 0, function() {
            var uploadApkConfig, apkUpload;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        uploadApkConfig = this.uploadConfigGenerator.generateAppUploadConfig(
                            apkFilePath,
                            uploadParameters,
                            'application/vnd.android.package-archive'
                        );
                        return [4 /*yield*/, this.publisher.edits.apks.upload(uploadApkConfig)];
                    case 1:
                        apkUpload = _a.sent();
                        return [
                            2 /*return*/,
                            {
                                sha1: apkUpload.data.binary.sha1,
                                sha256: apkUpload.data.binary.sha256,
                                versionCode: apkUpload.data.versionCode
                            }
                        ];
                }
            });
        });
    };
    AndroidPublisherV3.prototype.updateTrack = function(updateParameters) {
        return __awaiter(this, void 0, void 0, function() {
            var trackUpdateResult;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.publisher.edits.tracks.update(Utilities_1.getTrackUpdateConfig(updateParameters))
                        ];
                    case 1:
                        trackUpdateResult = _a.sent();
                        return [2 /*return*/, trackUpdateResult.data];
                }
            });
        });
    };
    AndroidPublisherV3.prototype.commitChanges = function(commitParameters) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.publisher.edits.commit(commitParameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AndroidPublisherV3;
})();
exports.AndroidPublisherV3 = AndroidPublisherV3;
//# sourceMappingURL=AndroidPublisherV3.js.map
