export declare class GPlayUploaderConfig {
    static allowedTracks: string[];
    private _configFile;
    private _track;
    private _authenticationPath;
    private _recentChanges;
    private _filePaths;
    private _obbFilePaths;
    private _rootPath;
    constructor({
        configFilePath,
        track,
        authenticationPath,
        recentChanges,
        filePaths,
        obbFilePaths,
        rootPath
    }: {
        configFilePath?: string;
        track?: string;
        authenticationPath?: string;
        recentChanges?: string[];
        filePaths?: string[];
        obbFilePaths?: string[];
        rootPath: string;
    });
    configFile: string;
    track: string;
    authenticationPath: string;
    recentChanges: string[];
    filePaths: string[];
    obbFilePaths: string[];
    isValidConfig(): boolean;
    isFilePathsValid(): boolean;
    isTrackValid(): boolean;
    isAuthenticationPathSet(): boolean;
}
