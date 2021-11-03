import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';
import { ApkUploadConfiguration, ApkUploadResult, UploadConfiguration } from 'GPlayUploader/Utilities/Types';

export class GPlayApkUploader extends GPlayFileUploader<ApkUploadResult> {
    async upload(apkFilePath: string, configuration: UploadConfiguration): Promise<ApkUploadResult> {
        log(`> Uploading APK`);
        const uploadApkConfig = this.generateUploadConfigFor<ApkUploadConfiguration>(apkFilePath, configuration);
        const apkUpload = await this.publisher.edits.apks.upload(uploadApkConfig);
        this.logSuccessMessage(apkUpload.data.versionCode, apkFilePath, apkUpload.data.binary.sha1);
        return apkUpload.data;
    }
}
