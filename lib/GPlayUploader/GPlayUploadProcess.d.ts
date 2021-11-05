import { GPlayUploaderConfig } from './GPlayUploaderConfig';
import { ManifestParser } from './UploadSteps/ManifestParser';
import { GPlayEditCreator } from './UploadSteps/GPlayEditCreator';
import { GPlayUploadCompleter } from './UploadSteps/GPlayUploadCompleter';
import { GPlayFileUploader } from './UploadSteps/GPlayFileUploader';
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
    private static getVersionCodesFromUploadResults;
}
