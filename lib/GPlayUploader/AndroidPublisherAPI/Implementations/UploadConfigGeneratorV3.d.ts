import { UploadConfigGenerator } from 'GPlayUploader/AndroidPublisherAPI/UploadConfigGenerator';
import { FileUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/FileUploadConfig';
import { ObbUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/ObbUploadConfig';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
export declare class UploadConfigGeneratorV3 implements UploadConfigGenerator<FileUploadConfig, ObbUploadConfig> {
    generateAppUploadConfig(filePath: string, parameters: BasicUploadParameters, mimeType?: string): FileUploadConfig;
    generateObbUploadConfig(obbFilePath: string, parameters: ObbUploadParameters, mimeType?: string): ObbUploadConfig;
}
