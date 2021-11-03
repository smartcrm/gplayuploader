import { TrackUpdateParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/TrackUpdateParameters';

export function getTrackUpdateConfig(updateParameters: TrackUpdateParameters) {
    return {
        packageName: updateParameters.packageName,
        editId: updateParameters.editId,
        track: updateParameters.track,
        resource: {
            track: updateParameters.track,
            releases: [
                {
                    versionCodes: updateParameters.versionCodes,
                    releaseNotes: [],
                    status: 'completed'
                }
            ]
        }
    };
}
