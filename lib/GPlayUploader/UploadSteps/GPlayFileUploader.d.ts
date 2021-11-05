import { AndroidPublisher } from '../AndroidPublisherAPI/AndroidPublisher';
import { BasicUploadParameters } from '../AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { AppUploadResult } from '../AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { ObbUploadParameters } from '../AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
export declare class GPlayFileUploader {
    protected readonly publisher: AndroidPublisher;
    constructor(publisher: AndroidPublisher);
    uploadAppPaths(filePaths: string[], uploadParameters: BasicUploadParameters): Promise<AppUploadResult[]>;
    uploadObbFilePaths(filePaths: string[], uploadParameters: ObbUploadParameters): Promise<void>;
    private uploadAppPath;
    private uploadMultiplePaths;
}
