import { GPlayUploaderConfig } from './GPlayUploaderConfig';
import { ManifestParser } from 'GPlayUploader/UploadSteps/ManifestParser';
import { GPlayEditCreator } from 'GPlayUploader/UploadSteps/GPlayEditCreator';
import { GPlayUploadCompleter } from 'GPlayUploader/UploadSteps/GPlayUploadCompleter';
import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';
export declare class GPlayUploadProcess {
    private readonly manifestParser;
    private readonly editCreator;
    private readonly fileUploader;
    private readonly uploadCompleter;
    constructor(
        manifestParser: ManifestParser,
        editCreator: GPlayEditCreator,
        fileUploader: GPlayFileUploader,
        uploadCompleter: GPlayUploadCompleter
    );
    start(uploaderConfig: GPlayUploaderConfig): Promise<void>;
    private static getVersionCodeFromUploadResults;
}
