import { androidpublisher_v3 } from 'googleapis';
import { GPlayUploaderConfig } from './GPlayUploaderConfig';
export declare class GPlayUploader {
    private _gPlayUploaderConfig;
    private packageName;
    private versionCodes;
    private editId;
    private publisher;
    constructor(gPlayUploaderConfig: GPlayUploaderConfig);
    start(): Promise<void>;
    parseManifest(): Promise<void>;
    getPackageNameFromManifest(pathToPackage: string): Promise<any>;
    isAABFilePath(path: string): boolean;
    authenticate(): Promise<androidpublisher_v3.Androidpublisher>;
    createEdit(): Promise<import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$AppEdit>>;
    uploadMultiplePaths(pathsToUpload: any, uploadSinglePathFunction: any): Promise<any[]>;
    uploadSinglePath(
        filePath: any
    ): Promise<
        | import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$Apk>
        | import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$Bundle>
    >;
    uploadSingleAPK(apkFilePath: any): Promise<import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$Apk>>;
    uploadSingleAppBundle(
        aabFilePath: any
    ): Promise<import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$Bundle>>;
    uploadSingleOBB(
        obbFilePath: any
    ): Promise<import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$ExpansionFilesUploadResponse>>;
    assignTrackAndReleaseNotes(): Promise<any>;
    getReleaseNotes(): any[];
    commitChanges(): Promise<import('gaxios').GaxiosResponse<androidpublisher_v3.Schema$AppEdit>>;
    _logger(message: string): void;
}
