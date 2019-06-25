export declare class GPlayUploaderConfig {
    static allowedTracks: string[];
    private _configFile;
    private _track;
    private _authentication;
    private _recentChanges;
    private _apkFiles;
    private _obbFiles;
    constructor({ configFile, track, authentication, recentChanges, apkFiles, obbFiles, }: {
        configFile?: string;
        track?: string;
        authentication?: string;
        recentChanges?: string[];
        apkFiles?: string[];
        obbFiles?: string[];
    });
    configFile: string;
    track: string;
    authentication: string;
    recentChanges: string[];
    apkFiles: string[];
    obbFiles: string[];
}
