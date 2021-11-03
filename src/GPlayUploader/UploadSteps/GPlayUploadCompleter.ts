import { AndroidPublisher, UploadConfiguration } from 'GPlayUploader/Utilities/Types';
import { GPlayUploaderConfig } from 'GPlayUploader/GPlayUploaderConfig';

export class GPlayUploadCompleter {
    private readonly publisher: AndroidPublisher;

    constructor(publisher: AndroidPublisher) {
        this.publisher = publisher;
    }

    async assignTrackAndReleaseNotes(
        uploaderConfig: GPlayUploaderConfig,
        uploadConfig: UploadConfiguration
    ): Promise<void> {
        log(`> Assigning APK to ${uploaderConfig.track} track`);

        const newTrackConfig = {
            packageName: uploadConfig.packageName,
            editId: uploadConfig.editId,
            track: uploaderConfig.track,
            resource: {
                track: uploaderConfig.track,
                releases: [
                    {
                        versionCodes: uploadConfig.versionCodes,
                        releaseNotes: [],
                        status: 'completed'
                    }
                ]
            }
        };

        const newTrack = await this.publisher.edits.tracks.update(newTrackConfig);
        log(`> Assigned APK to ${newTrack.data.track} track`);
    }

    async commitChanges(packageName: string, editId: string): Promise<void> {
        log('> Commiting changes');
        const commitedChanges = await this.publisher.edits.commit({
            editId: editId,
            packageName: packageName
        });
        log('> Commited changes');
    }
}
