import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { TrackUpdateResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateResult';
import { ObbUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadResult';

/**
 * Abstraction of the Android Publisher API. If you want to update this project to a newer version of the API you only
 * have to re-implement this interface.
 */
export interface AndroidPublisherAPI {
    generateEditId(packageName: string): Promise<string>;

    uploadApp(filePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult>;

    uploadObb(filePath: string, uploadParameters: ObbUploadParameters): Promise<ObbUploadResult>;

    updateTrack(updateParameters: TrackUpdateParameters): Promise<TrackUpdateResult>;

    commitChanges(commitParameters: BasicUploadParameters): Promise<void>;
}
