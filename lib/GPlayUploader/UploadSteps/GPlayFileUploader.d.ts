import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
export declare class GPlayFileUploader {
    protected readonly publisher: AndroidPublisher;
    constructor(publisher: AndroidPublisher);
    uploadAppPaths(filePaths: string[], uploadParameters: BasicUploadParameters): Promise<AppUploadResult[]>;
    uploadObbFilePaths(filePaths: string[], uploadParameters: ObbUploadParameters): Promise<void>;
    private uploadAppPath;
    private uploadMultiplePaths;
}
