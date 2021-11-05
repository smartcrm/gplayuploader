'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function getTrackUpdateConfig(updateParameters) {
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
exports.getTrackUpdateConfig = getTrackUpdateConfig;
//# sourceMappingURL=Utilities.js.map
