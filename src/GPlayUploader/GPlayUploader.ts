import { GPlayUploaderConfig } from './GPlayUploaderConfig';
import { ManifestParser } from 'GPlayUploader/UploadSteps/ManifestParser';
import { ApkUploadResult, BundleUploadResult, UploadConfiguration } from 'GPlayUploader/Utilities/Types';
import { GPlayApkUploader } from 'GPlayUploader/UploadSteps/GPlayApkUploader';
import { GPlayBundleUploader } from 'GPlayUploader/UploadSteps/GPlayBundleUploader';
import { GPlayObbUploader } from 'GPlayUploader/UploadSteps/GPlayObbUploader';
import { GPlayEditCreator } from 'GPlayUploader/UploadSteps/GPlayEditCreator';
import { GPlayUploadCompleter } from 'GPlayUploader/UploadSteps/GPlayUploadCompleter';

export class GPlayUploader {
    constructor(
        private readonly manifestParser: ManifestParser,
        private readonly editCreator: GPlayEditCreator,
        private readonly apkUploader: GPlayApkUploader,
        private readonly bundleUploader: GPlayBundleUploader,
        private readonly obbUploader: GPlayObbUploader,
        private readonly uploadCompleter: GPlayUploadCompleter
    ) {}

    async start(uploaderConfig: GPlayUploaderConfig) {
        try {
            const packageName = await this.manifestParser.getPackageNameFromManifest(uploaderConfig.filePaths[0]);
            const editId = await this.editCreator.createEdit(packageName);
            const uploadConfiguration: UploadConfiguration = { packageName, editId };

            const uploadResults = await this.uploadFilePaths(uploaderConfig.filePaths, uploadConfiguration);
            uploadConfiguration.versionCodes = GPlayUploader.getVersionCodeFromUploadResults(uploadResults);

            await this.uploadObbFilePaths(uploaderConfig.obbFilePaths, uploadConfiguration);
            await this.uploadCompleter.assignTrackAndReleaseNotes(uploaderConfig, uploadConfiguration);
            await this.uploadCompleter.commitChanges(packageName, editId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async uploadFilePaths(
        filePaths: string[],
        uploadConfiguration: UploadConfiguration
    ): Promise<(ApkUploadResult | BundleUploadResult)[]> {
        return await this.uploadMultiplePaths(filePaths, async (filePath) => {
            return await this.uploadSinglePath(filePath, uploadConfiguration);
        });
    }

    private async uploadObbFilePaths(filePaths: string[], uploadConfiguration: UploadConfiguration): Promise<void> {
        await this.uploadMultiplePaths(filePaths, (obbFilePath) => {
            return this.obbUploader.upload(obbFilePath, uploadConfiguration);
        });
    }

    private async uploadMultiplePaths<T = any>(pathsToUpload, uploadSinglePathFunction): Promise<T[]> {
        const uploadQue: Promise<T>[] = [];

        pathsToUpload.forEach((filePath) => {
            const newUpload: Promise<T> = uploadSinglePathFunction(filePath);
            uploadQue.push(newUpload);
        });

        return Promise.all(uploadQue);
    }

    async uploadSinglePath(filePath, uploadConfiguration: UploadConfiguration) {
        if (isAABFilePath(filePath)) {
            return this.bundleUploader.upload(filePath, uploadConfiguration);
        }
        return this.apkUploader.upload(filePath, {
            ...uploadConfiguration,
            mimeType: 'application/vnd.android.package-archive'
        });
    }

    private static getVersionCodeFromUploadResults(uploadResults: (ApkUploadResult | BundleUploadResult)[]): number[] {
        return uploadResults.map((uploadResult: ApkUploadResult | BundleUploadResult) => {
            return uploadResult.versionCode;
        });
    }
}
