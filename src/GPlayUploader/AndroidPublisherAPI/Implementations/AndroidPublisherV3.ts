import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { UploadConfigGenerator } from 'GPlayUploader/AndroidPublisherAPI/UploadConfigGenerator';
import { FileUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/FileUploadConfig';
import { ObbUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/ObbUploadConfig';
import { getTrackUpdateConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/Utilities';
import { TrackUpdateResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateResult';
import { isAABFilePath } from 'GPlayUploader/UploadSteps/Utilities/Utilities';
import { androidpublisher_v3 } from 'googleapis';
import { ObbUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadResult';

export class AndroidPublisherV3 implements AndroidPublisher {
    private readonly publisher: androidpublisher_v3.Androidpublisher;
    private readonly uploadConfigGenerator: UploadConfigGenerator<FileUploadConfig, ObbUploadConfig>;

    constructor(
        publisher: androidpublisher_v3.Androidpublisher,
        uploadConfigGenerator: UploadConfigGenerator<FileUploadConfig, ObbUploadConfig>
    ) {
        this.publisher = publisher;
        this.uploadConfigGenerator = uploadConfigGenerator;
    }

    async generateEditId(packageName: string): Promise<string> {
        const edit = await this.publisher.edits.insert({ packageName: packageName });
        return edit.data.id;
    }

    async uploadApp(filePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult> {
        if (isAABFilePath(filePath)) {
            return this.uploadBundle(filePath, uploadParameters);
        }
        return this.uploadAPK(filePath, uploadParameters);
    }

    async uploadObb(filePath: string, uploadParameters: ObbUploadParameters): Promise<ObbUploadResult> {
        const obbUploadConfig = this.uploadConfigGenerator.generateObbUploadConfig(filePath, uploadParameters);
        const obbUpload = await this.publisher.edits.expansionfiles.upload(obbUploadConfig);
        return obbUpload.data;
    }

    private async uploadBundle(aabFilePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult> {
        const uploadAabConfig = this.uploadConfigGenerator.generateAppUploadConfig(aabFilePath, uploadParameters);
        const uploadResult = await this.publisher.edits.bundles.upload(uploadAabConfig);
        return uploadResult.data;
    }

    private async uploadAPK(apkFilePath: string, uploadParameters: BasicUploadParameters): Promise<AppUploadResult> {
        const uploadApkConfig = this.uploadConfigGenerator.generateAppUploadConfig(
            apkFilePath,
            uploadParameters,
            'application/vnd.android.package-archive'
        );
        const apkUpload = await this.publisher.edits.apks.upload(uploadApkConfig);
        return {
            sha1: apkUpload.data.binary.sha1,
            sha256: apkUpload.data.binary.sha256,
            versionCode: apkUpload.data.versionCode
        };
    }

    async updateTrack(updateParameters: TrackUpdateParameters): Promise<TrackUpdateResult> {
        const trackUpdateResult = await this.publisher.edits.tracks.update(getTrackUpdateConfig(updateParameters));
        return trackUpdateResult.data;
    }

    async commitChanges(commitParameters: BasicUploadParameters): Promise<void> {
        await this.publisher.edits.commit(commitParameters);
    }
}
