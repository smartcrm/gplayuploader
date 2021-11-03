import { createReadStream } from 'fs';
import { AndroidPublisher, GPlayUploadConfiguration, UploadConfiguration } from 'GPlayUploader/Utilities/Types';

export abstract class GPlayFileUploader<ResultType> {
    protected readonly publisher: AndroidPublisher;

    constructor(publisher: AndroidPublisher) {
        this.publisher = publisher;
    }

    abstract async upload(filePath: string, configuration: UploadConfiguration): Promise<ResultType>;

    protected generateUploadConfigFor<T extends GPlayUploadConfiguration>(
        filePath: string,
        configuration: UploadConfiguration
    ): T {
        const uploadConfig: GPlayUploadConfiguration = {
            packageName: configuration.packageName,
            editId: configuration.editId,
            media: {
                body: createReadStream(filePath)
            }
        };
        if (configuration.mimeType !== undefined) {
            uploadConfig.media.mimeType = configuration.mimeType;
        }
        return uploadConfig as T;
    }

    protected logSuccessMessage(versionCode: number, filePath: string, sha1Hash: string): void {
        log(this.getUploadSuccessMessage(filePath, versionCode, sha1Hash));
    }

    protected getUploadSuccessMessage(filePath: string, versionCode: number, sha1Hash: string): string {
        return `> Uploaded ${filePath} with version code ${versionCode} and SHA1 ${sha1Hash}`;
    }
}
