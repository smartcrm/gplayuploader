'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = require('fs');
var UploadConfigGeneratorV3 = /** @class */ (function() {
    function UploadConfigGeneratorV3() {}
    UploadConfigGeneratorV3.prototype.generateAppUploadConfig = function(filePath, parameters, mimeType) {
        var uploadConfig = {
            packageName: parameters.packageName,
            editId: parameters.editId,
            media: {
                body: fs_1.createReadStream(filePath)
            }
        };
        if (mimeType !== undefined) {
            uploadConfig.media.mimeType = mimeType;
        }
        return uploadConfig;
    };
    UploadConfigGeneratorV3.prototype.generateObbUploadConfig = function(obbFilePath, parameters, mimeType) {
        return {
            packageName: parameters.packageName,
            editId: parameters.editId,
            // TODO: find out a petter way to set up the right versioncodes.
            apkVersionCode: parameters.versionCodes[0],
            expansionFileType: 'main',
            media: {
                mimeType: 'application/octet-stream',
                body: fs_1.createReadStream(obbFilePath)
            }
        };
    };
    return UploadConfigGeneratorV3;
})();
exports.UploadConfigGeneratorV3 = UploadConfigGeneratorV3;
//# sourceMappingURL=UploadConfigGeneratorV3.js.map
