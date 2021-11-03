import { AndroidPublisher } from '../AndroidPublisher';
import { BasicUploadParameters } from '../InterfaceTypes/BasicUploadParameters';
import { TrackUpdateParameters } from '../InterfaceTypes/TrackUpdateParameters';
import { AppUploadResult } from '../InterfaceTypes/AppUploadResult';
import { ObbUploadParameters } from '../InterfaceTypes/ObbUploadParameters';
import { UploadConfigGenerator } from '../UploadConfigGenerator';
import { FileUploadConfig } from './Utilities/FileUploadConfig';
import { ObbUploadConfig } from './Utilities/ObbUploadConfig';
import { TrackUpdateResult } from '../InterfaceTypes/TrackUpdateResult';
import { androidpublisher_v3 } from 'googleapis';
import { ObbUploadResult } from '../InterfaceTypes/ObbUploadResult';
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
