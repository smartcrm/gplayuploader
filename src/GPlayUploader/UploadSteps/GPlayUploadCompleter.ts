import { AndroidPublisherAPI } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisherAPI';
import { log } from 'GPlayUploader/UploadSteps/Utilities/Utilities';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';

export class GPlayUploadCompleter {
    private readonly publisher: AndroidPublisherAPI;

    constructor(publisher: AndroidPublisherAPI) {
        this.publisher = publisher;
    }

    async assignTrackAndReleaseNotes(updateParameters: TrackUpdateParameters): Promise<void> {
        log(`> Assigning APK to ${updateParameters.track} track`);
        const trackUpdateResult = await this.publisher.updateTrack(updateParameters);
        log(`> Assigned APK to ${trackUpdateResult.track} track`);
    }

    async commitChanges(commitParameters: BasicUploadParameters): Promise<void> {
        log('> Commiting changes');
        await this.publisher.commitChanges(commitParameters);
        log('> Commited changes');
    }
}
