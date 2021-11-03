import { AndroidPublisherAPI } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisherAPI';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { logAppUploadStartMessage, logAppUploadSuccessMessage } from 'GPlayUploader/UploadSteps/Utilities/Utilities';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';

export class GPlayFileUploader {
    protected readonly publisher: AndroidPublisherAPI;

    constructor(publisher: AndroidPublisherAPI) {
        this.publisher = publisher;
    }

    async uploadAppPaths(filePaths: string[], uploadParameters: BasicUploadParameters): Promise<AppUploadResult[]> {
        return await this.uploadMultiplePaths(filePaths, async (filePath) => {
            return await this.uploadAppPath(filePath, uploadParameters);
        });
    }

    async uploadObbFilePaths(filePaths: string[], uploadParameters: ObbUploadParameters): Promise<void> {
        await this.uploadMultiplePaths(filePaths, (obbFilePath) => {
            return this.publisher.uploadObb(obbFilePath, uploadParameters);
        });
    }

    private async uploadAppPath(filePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult> {
        logAppUploadStartMessage(filePath);
        const uploadResult = await this.publisher.uploadApp(filePath, uploadParameters);
        logAppUploadSuccessMessage(uploadResult.versionCode, filePath, uploadResult.sha1);
        return uploadResult;
    }

    private async uploadMultiplePaths<T = any>(pathsToUpload, uploadSinglePathFunction): Promise<T[]> {
        const uploadQue: Promise<T>[] = [];

        pathsToUpload.forEach((filePath) => {
            const newUpload: Promise<T> = uploadSinglePathFunction(filePath);
            uploadQue.push(newUpload);
        });

        return Promise.all(uploadQue);
    }
}
