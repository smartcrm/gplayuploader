import { createReadStream } from 'fs';
import { UploadConfigGenerator } from 'GPlayUploader/AndroidPublisherAPI/UploadConfigGenerator';
import { FileUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/FileUploadConfig';
import { ObbUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/ObbUploadConfig';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';

export class UploadConfigGeneratorV3 implements UploadConfigGenerator<FileUploadConfig, ObbUploadConfig> {
    generateAppUploadConfig(filePath: string, parameters: BasicUploadParameters, mimeType?: string): FileUploadConfig {
        const uploadConfig: FileUploadConfig = {
            packageName: parameters.packageName,
            editId: parameters.editId,
            media: {
                body: createReadStream(filePath)
            }
        };
        if (mimeType !== undefined) {
            uploadConfig.media.mimeType = mimeType;
        }
        return uploadConfig;
    }

    generateObbUploadConfig(obbFilePath: string, parameters: ObbUploadParameters, mimeType?: string): ObbUploadConfig {
        return {
            packageName: parameters.packageName,
            editId: parameters.editId,
            // TODO: find out a petter way to set up the right versioncodes.
            apkVersionCode: parameters.versionCodes[0],
            expansionFileType: 'main',
            media: {
                mimeType: 'application/octet-stream',
                body: createReadStream(obbFilePath)
            }
        };
    }
}
