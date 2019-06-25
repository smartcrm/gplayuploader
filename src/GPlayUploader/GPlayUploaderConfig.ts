export class GPlayUploaderConfig {
    static allowedTracks: string[] = ['internal', 'alpha', 'beta', 'production'];

    private _configFile: string;
    private _track: string;
    private _authentication: string;
    private _recentChanges: string[];
    private _apkFiles: string[];
    private _obbFiles: string[];

    constructor({
        configFile,
        track,
        authentication,
        recentChanges,
        apkFiles,
        obbFiles,
    }: {
        configFile?: string;
        track?: string;
        authentication?: string;
        recentChanges?: string[];
        apkFiles?: string[];
        obbFiles?: string[];
    }) {
        this.configFile = configFile;
        this.track = track;
        this.authentication = authentication;
        this.recentChanges = recentChanges;
        this.apkFiles = apkFiles;
        this.obbFiles = obbFiles;
    }

    get configFile() {
        return this._configFile;
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

    get authentication() {
        return this._authentication;
    }

    set authentication(value: string) {
        this._authentication = value;
    }

    get recentChanges() {
        return this._recentChanges;
    }

    set recentChanges(value: string[]) {
        this._recentChanges = value;
    }

    get apkFiles() {
        return this._apkFiles;
    }

    set apkFiles(value: string[]) {
        this._apkFiles = value;
    }

    get obbFiles() {
        return this._obbFiles;
    }

    set obbFiles(value: string[]) {
        this._obbFiles = value;
    }
}
