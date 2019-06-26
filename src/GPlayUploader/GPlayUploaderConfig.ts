import * as path from 'path';

export class GPlayUploaderConfig {
    static allowedTracks: string[] = ['internal', 'alpha', 'beta', 'production'];

    private _configFile: string;
    private _track: string;
    private _authenticationPath: string;
    private _recentChanges: string[] = [];
    private _apkFilePaths: string[] = [];
    private _obbFilePaths: string[] = [];

    constructor({
        configFilePath,
        track,
        authenticationPath,
        recentChanges,
        apkFilePaths,
        obbFilePaths
    }: {
        configFilePath?: string;
        track?: string;
        authenticationPath?: string;
        recentChanges?: string[];
        apkFilePaths?: string[];
        obbFilePaths?: string[];
    }) {
        this.configFile = configFilePath;
        this.track = track;
        this.authenticationPath = authenticationPath;
        this.recentChanges = recentChanges;
        this.apkFilePaths = apkFilePaths;
        this.obbFilePaths = obbFilePaths;
    }

    set configFile(value: string) {
        this._configFile = value;
    }

    get track() {
        return this._track;
    }

    set track(value: string) {
        this._track = value;
    }

    get authenticationPath() {
        return this._authenticationPath;
    }

    set authenticationPath(value: string) {
        try {
            this._authenticationPath = path.resolve(__dirname, value);
        } catch (e) {
            throw new Error('authenticationPath is wrong');
        }
    }

    get recentChanges() {
        return this._recentChanges;
    }

    set recentChanges(value: string[]) {
        this._recentChanges = value;
    }

    get apkFilePaths() {
        return this._apkFilePaths;
    }

    set apkFilePaths(value: string[]) {
        try {
            value.forEach((pathValue) => {
                this._apkFilePaths.push(path.resolve(__dirname, pathValue));
            });
        } catch (e) {
            throw new Error('APK Paths are wrong.');
        }
    }

    get obbFilePaths() {
        return this._obbFilePaths;
    }

    set obbFilePaths(value: string[]) {
        try {
            value.forEach((pathValue) => {
                this._obbFilePaths.push(path.resolve(__dirname, pathValue));
            });
        } catch (e) {
            console.log('No OBBs.');
        }
    }

    isValidConfig() {
        return this.isApkFilePathsValid() && this.isTrackValid() && this.isAuthenticationPathSet();
    }

    isApkFilePathsValid() {
        if (this.apkFilePaths.length < 0) {
            return false;
        }
        this.apkFilePaths.forEach((filePath) => {
            if (typeof filePath !== 'string' || !Boolean(filePath.trim())) {
                return false;
            }
        });

        return true;
    }

    isTrackValid() {
        return GPlayUploaderConfig.allowedTracks.includes(this.track);
    }

    isAuthenticationPathSet() {
        return typeof this.authenticationPath === 'string' && Boolean(this.authenticationPath.trim());
    }
}
