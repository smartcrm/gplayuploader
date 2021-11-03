import { UploadConfigGenerator } from '../UploadConfigGenerator';
import { FileUploadConfig } from './Utilities/FileUploadConfig';
import { ObbUploadConfig } from './Utilities/ObbUploadConfig';
import { ObbUploadParameters } from '../InterfaceTypes/ObbUploadParameters';
import { BasicUploadParameters } from '../InterfaceTypes/BasicUploadParameters';
export declare class UploadConfigGeneratorV3 implements UploadConfigGenerator<FileUploadConfig, ObbUploadConfig> {
    generateAppUploadConfig(filePath: string, parameters: BasicUploadParameters, mimeType?: string): FileUploadConfig;
    generateObbUploadConfig(obbFilePath: string, parameters: ObbUploadParameters, mimeType?: string): ObbUploadConfig;
}
