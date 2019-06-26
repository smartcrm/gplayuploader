'use strict';
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
Object.defineProperty(exports, '__esModule', { value: true });
var path = __importStar(require('path'));
var GPlayUploaderConfig = /** @class */ (function() {
    function GPlayUploaderConfig(_a) {
        var configFilePath = _a.configFilePath,
            track = _a.track,
            authenticationPath = _a.authenticationPath,
            recentChanges = _a.recentChanges,
            apkFilePaths = _a.apkFilePaths,
            obbFilePaths = _a.obbFilePaths,
            rootPath = _a.rootPath;
        this._recentChanges = [];
        this._apkFilePaths = [];
        this._obbFilePaths = [];
        this._rootPath = rootPath;
        this.configFile = configFilePath;
        this.track = track;
        this.authenticationPath = authenticationPath;
        this.recentChanges = recentChanges;
        this.apkFilePaths = apkFilePaths;
        this.obbFilePaths = obbFilePaths;
    }
    Object.defineProperty(GPlayUploaderConfig.prototype, 'configFile', {
        set: function(value) {
            this._configFile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, 'track', {
        get: function() {
            return this._track;
        },
        set: function(value) {
            this._track = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, 'authenticationPath', {
        get: function() {
            return this._authenticationPath;
        },
        set: function(value) {
            try {
                this._authenticationPath = path.resolve(this._rootPath, value);
            } catch (e) {
                throw new Error('authenticationPath is wrong');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, 'recentChanges', {
        get: function() {
            return this._recentChanges;
        },
        set: function(value) {
            this._recentChanges = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, 'apkFilePaths', {
        get: function() {
            return this._apkFilePaths;
        },
        set: function(value) {
            var _this = this;
            try {
                value.forEach(function(pathValue) {
                    _this._apkFilePaths.push(path.resolve(_this._rootPath, pathValue));
                });
            } catch (e) {
                throw new Error('APK Paths are wrong.');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPlayUploaderConfig.prototype, 'obbFilePaths', {
        get: function() {
            return this._obbFilePaths;
        },
        set: function(value) {
            var _this = this;
            try {
                value.forEach(function(pathValue) {
                    _this._obbFilePaths.push(path.resolve(_this._rootPath, pathValue));
                });
            } catch (e) {
                console.log('No OBBs.');
            }
        },
        enumerable: true,
        configurable: true
    });
    GPlayUploaderConfig.prototype.isValidConfig = function() {
        return this.isApkFilePathsValid() && this.isTrackValid() && this.isAuthenticationPathSet();
    };
    GPlayUploaderConfig.prototype.isApkFilePathsValid = function() {
        if (this.apkFilePaths.length < 0) {
            return false;
        }
        this.apkFilePaths.forEach(function(filePath) {
            if (typeof filePath !== 'string' || !Boolean(filePath.trim())) {
                return false;
            }
        });
        return true;
    };
    GPlayUploaderConfig.prototype.isTrackValid = function() {
        return GPlayUploaderConfig.allowedTracks.includes(this.track);
    };
    GPlayUploaderConfig.prototype.isAuthenticationPathSet = function() {
        return typeof this.authenticationPath === 'string' && Boolean(this.authenticationPath.trim());
    };
    GPlayUploaderConfig.allowedTracks = ['internal', 'alpha', 'beta', 'production'];
    return GPlayUploaderConfig;
})();
exports.GPlayUploaderConfig = GPlayUploaderConfig;
//# sourceMappingURL=GPlayUploaderConfig.js.map
