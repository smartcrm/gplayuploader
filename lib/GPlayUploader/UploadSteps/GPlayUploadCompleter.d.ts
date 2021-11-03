import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
export declare class GPlayUploadCompleter {
    private readonly publisher;
    constructor(publisher: AndroidPublisher);
    assignTrackAndReleaseNotes(updateParameters: TrackUpdateParameters): Promise<void>;
    commitChanges(commitParameters: BasicUploadParameters): Promise<void>;
}
