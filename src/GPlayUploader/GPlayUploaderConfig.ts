import * as path from 'path';
import * as fs from 'fs';

export class GPlayUploaderConfig {
    static allowedTracks: string[] = ['internal', 'alpha', 'beta', 'production'];

    private _configFile: string;
    private _track: string;
    private _authenticationPath: string;
    private _recentChanges: string[] = [];
    private _filePaths: string[] = [];
    private _obbFilePaths: string[] = [];

    private _rootPath: string;

    constructor({
        configFilePath,
        track,
        authenticationPath,
        recentChanges,
        apkFilePaths,
        obbFilePaths,
        rootPath
    }: {
        configFilePath?: string;
        track?: string;
        authenticationPath?: string;
        recentChanges?: string[];
        apkFilePaths?: string[];
        obbFilePaths?: string[];
        rootPath: string;
    }) {
        this._rootPath = rootPath;

        this.configFile = configFilePath;
        this.track = track;
        this.authenticationPath = authenticationPath;
        this.recentChanges = recentChanges;
        this.filePaths = apkFilePaths;
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
            this._authenticationPath = path.resolve(this._rootPath, value);
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

    get filePaths() {
        return this._filePaths;
    }

    set filePaths(value: string[]) {
        try {
            value.forEach((pathValue) => {
                this._filePaths.push(path.resolve(this._rootPath, pathValue));
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
                this._obbFilePaths.push(path.resolve(this._rootPath, pathValue));
            });
        } catch (e) {
            console.log('No OBBs.');
        }
    }

    isValidConfig() {
        return this.isFilePathsValid() && this.isTrackValid() && this.isAuthenticationPathSet();
    }

    isFilePathsValid() {
        if (this.filePaths.length < 0) {
            return false;
        }
        this.filePaths.forEach((filePath) => {
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
