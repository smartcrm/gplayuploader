import { TrackUpdateParameters } from '../../InterfaceTypes/TrackUpdateParameters';
export declare function getTrackUpdateConfig(
    updateParameters: TrackUpdateParameters
): {
    packageName: string;
    editId: string;
    track: string;
    resource: {
        track: string;
        releases: {
            versionCodes: number[];
            releaseNotes: any[];
            status: string;
        }[];
    };
};
