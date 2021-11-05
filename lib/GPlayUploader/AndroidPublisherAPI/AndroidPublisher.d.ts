import { AppUploadResult } from './InterfaceTypes/AppUploadResult';
import { BasicUploadParameters } from './InterfaceTypes/BasicUploadParameters';
import { ObbUploadParameters } from './InterfaceTypes/ObbUploadParameters';
import { TrackUpdateParameters } from './InterfaceTypes/TrackUpdateParameters';
import { TrackUpdateResult } from './InterfaceTypes/TrackUpdateResult';
import { ObbUploadResult } from './InterfaceTypes/ObbUploadResult';
/**
 * Abstraction of the Android Publisher API. If you want to update this project to a newer version of the API you only
 * have to re-implement this interface.
 */
export interface AndroidPublisher {
    generateEditId(packageName: string): Promise<string>;
    uploadApp(filePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult>;
    uploadObb(filePath: string, uploadParameters: ObbUploadParameters): Promise<ObbUploadResult>;
    updateTrack(updateParameters: TrackUpdateParameters): Promise<TrackUpdateResult>;
    commitChanges(commitParameters: BasicUploadParameters): Promise<void>;
}
