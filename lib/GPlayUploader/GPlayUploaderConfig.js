"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GPlayUploaderConfig = /** @class */ (function () {
    function GPlayUploaderConfig(_a) {
        var configFile = _a.configFile, track = _a.track, authentication = _a.authentication, recentChanges = _a.recentChanges, apkFiles = _a.apkFiles, obbFiles = _a.obbFiles;
        this.configFile = configFile;
        this.track = track;
        this.authentication = authentication;
        this.recentChanges = recentChanges;
        this.apkFiles = apkFiles;
        this.obbFiles = obbFiles;
    }
    Object.defineProperty(GPlayUploaderConfig.prototype, "configFile", {
        get: function () {
            return this._configFile;
        },
        set: function (value) {
            this._configFile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, "track", {
        get: function () {
            return this._track;
        },
        set: function (value) {
            this._track = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, "authentication", {
        get: function () {
            return this._authentication;
        },
        set: function (value) {
            this._authentication = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, "recentChanges", {
        get: function () {
            return this._recentChanges;
        },
        set: function (value) {
            this._recentChanges = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, "apkFiles", {
        get: function () {
            return this._apkFiles;
        },
        set: function (value) {
            this._apkFiles = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, "obbFiles", {
        get: function () {
            return this._obbFiles;
        },
        set: function (value) {
            this._obbFiles = value;
        },
        enumerable: true,
        configurable: true
    });
    GPlayUploaderConfig.allowedTracks = ['internal', 'alpha', 'beta', 'production'];
    return GPlayUploaderConfig;
}());
exports.GPlayUploaderConfig = GPlayUploaderConfig;
//# sourceMappingURL=GPlayUploaderConfig.js.map