import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { UploadConfigGenerator } from 'GPlayUploader/AndroidPublisherAPI/UploadConfigGenerator';
import { FileUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/FileUploadConfig';
import { ObbUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/ObbUploadConfig';
import { TrackUpdateResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateResult';
import { androidpublisher_v3 } from 'googleapis';
import { ObbUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadResult';
export declare class AndroidPublisherV3 implements AndroidPublisher {
    private readonly publisher;
    private readonly uploadConfigGenerator;
    constructor(
        publisher: androidpublisher_v3.Androidpublisher,
        uploadConfigGenerator: UploadConfigGenerator<FileUploadConfig, ObbUploadConfig>
    );
    generateEditId(packageName: string): Promise<string>;
    uploadApp(filePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult>;
    uploadObb(filePath: string, uploadParameters: ObbUploadParameters): Promise<ObbUploadResult>;
    private uploadBundle;
    private uploadAPK;
    updateTrack(updateParameters: TrackUpdateParameters): Promise<TrackUpdateResult>;
    commitChanges(commitParameters: BasicUploadParameters): Promise<void>;
}
