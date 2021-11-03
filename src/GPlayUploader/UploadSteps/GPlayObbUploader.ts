import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';
import { ObbUploadResult, UploadConfiguration } from 'GPlayUploader/Utilities/Types';
import { createReadStream } from 'fs';

export class GPlayObbUploader extends GPlayFileUploader<ObbUploadResult> {
    async upload(obbFilePath: string, configuration: UploadConfiguration): Promise<ObbUploadResult> {
        log(`> Uploading expansion file(s)`);
        const obbUploadConfig = {
            packageName: configuration.packageName,
            editId: configuration.editId,
            // TODO: find out a petter way to set up the right versioncodes.
            apkVersionCode: configuration.versionCodes[0],
            expansionFileType: 'main',
            media: {
                mimeType: 'application/octet-stream',
                body: createReadStream(obbFilePath)
            }
        };
        const obbUpload = await this.publisher.edits.expansionfiles.upload(obbUploadConfig);
        return obbUpload.data;
    }
}
