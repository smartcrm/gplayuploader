import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
/**
 * Generator to create configs for the android publisher api. Only re-implement if the input parameters of the android
 * publisher API change.
 */
export interface UploadConfigGenerator<AppUploadConfigType, ObbUploadConfigType> {
    generateAppUploadConfig(
        filePath: string,
        parameters: BasicUploadParameters,
        mimeType?: string
    ): AppUploadConfigType;
    generateObbUploadConfig(filePath: string, parameters: ObbUploadParameters, mimeType?: string): ObbUploadConfigType;
}
