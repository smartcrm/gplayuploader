export declare class GPlayUploaderConfig {
    static allowedTracks: string[];
    private _configFile;
    private _track;
    private _authenticationPath;
    private _recentChanges;
    private _apkFilePaths;
    private _obbFilePaths;
    private _rootPath;
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
    });
    configFile: string;
    track: string;
    authenticationPath: string;
    recentChanges: string[];
    apkFilePaths: string[];
    obbFilePaths: string[];
    isValidConfig(): boolean;
    isApkFilePathsValid(): boolean;
    isTrackValid(): boolean;
    isAuthenticationPathSet(): boolean;
}
