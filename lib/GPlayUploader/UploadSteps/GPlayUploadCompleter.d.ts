import { AndroidPublisher } from '../AndroidPublisherAPI/AndroidPublisher';
import { TrackUpdateParameters } from '../AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';
import { BasicUploadParameters } from '../AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';
export declare class GPlayUploadCompleter {
    private readonly publisher;
    constructor(publisher: AndroidPublisher);
    assignTrackAndReleaseNotes(updateParameters: TrackUpdateParameters): Promise<void>;
    commitChanges(commitParameters: BasicUploadParameters): Promise<void>;
}
