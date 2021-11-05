import { GPlayUploaderConfig } from './GPlayUploaderConfig';
import { ManifestParser } from 'GPlayUploader/UploadSteps/ManifestParser';
import { GPlayEditCreator } from 'GPlayUploader/UploadSteps/GPlayEditCreator';
import { GPlayUploadCompleter } from 'GPlayUploader/UploadSteps/GPlayUploadCompleter';
import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
import { ObbUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/ObbUploadParameters';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { AppUploadResult } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/AppUploadResult';

export class GPlayUploadProcess {
    constructor(
        private readonly manifestParser: ManifestParser,
        private readonly editCreator: GPlayEditCreator,
        private readonly fileUploader: GPlayFileUploader,
        private readonly uploadCompleter: GPlayUploadCompleter
    ) {}

    async start(uploaderConfig: GPlayUploaderConfig) {
        try {
            const packageName = await this.manifestParser.getPackageNameFromManifest(uploaderConfig.filePaths[0]);
            const editId = await this.editCreator.getEditId(packageName);
            const uploadParameters: BasicUploadParameters = { packageName, editId };
            const uploadResults = await this.fileUploader.uploadAppPaths(uploaderConfig.filePaths, uploadParameters);

            const obbUploadParameters: ObbUploadParameters = {
                ...uploadParameters,
                versionCodes: GPlayUploadProcess.getVersionCodesFromUploadResults(uploadResults)
            };
            await this.fileUploader.uploadObbFilePaths(uploaderConfig.obbFilePaths, obbUploadParameters);

            const trackUpdateParameters: TrackUpdateParameters = {
                ...obbUploadParameters,
                track: uploaderConfig.track
            };
            await this.uploadCompleter.assignTrackAndReleaseNotes(trackUpdateParameters);
            await this.uploadCompleter.commitChanges(uploadParameters);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private static getVersionCodesFromUploadResults(uploadResults: AppUploadResult[]): number[] {
        return uploadResults.map((uploadResult: AppUploadResult) => {
            return uploadResult.versionCode;
        });
    }
}
