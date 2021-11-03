import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';
import { AabUploadConfiguration, BundleUploadResult, UploadConfiguration } from 'GPlayUploader/Utilities/Types';

export class GPlayBundleUploader extends GPlayFileUploader<BundleUploadResult> {
    async upload(aabFilePath: string, configuration: UploadConfiguration): Promise<BundleUploadResult> {
        log(`> Uploading App Bundle`);
        const uploadAabConfig = this.generateUploadConfigFor<AabUploadConfiguration>(aabFilePath, configuration);
        const bundleUpload = await this.publisher.edits.bundles.upload(uploadAabConfig);
        this.logSuccessMessage(bundleUpload.data.versionCode, aabFilePath, bundleUpload.data.sha1);
        return bundleUpload.data;
    }
}
