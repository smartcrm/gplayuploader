import { GPlayUploaderConfig } from './GPlayUploaderConfig';
export declare class GPlayUploader {
    private _gPlayUploaderConfig;
    private packageName;
    private versionCodes;
    private editId;
    private publisher;
    constructor(gPlayUploaderConfig: GPlayUploaderConfig);
    start(): Promise<void>;
    parseManifest(): Promise<any>;
    authenticate(): Promise<import('googleapis').androidpublisher_v3.Androidpublisher>;
    createEdit(): Promise<any>;
    uploadMultiplePaths(pathsToUpload: any, uploadSinglePathFunction: any): Promise<any[]>;
    uploadSingleAPK(apkFilePath: any): Promise<any>;
    uploadSingleOBB(obbFilePath: any): Promise<any>;
    assignTrackAndReleaseNotes(): Promise<any>;
    getReleaseNotes(): any[];
    commitChanges(): Promise<any>;
    _logger(message: string): void;
}
