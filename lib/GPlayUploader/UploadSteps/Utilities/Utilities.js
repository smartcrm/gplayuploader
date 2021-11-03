'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function log(message) {
    console.log(message);
}
exports.log = log;
function logAppUploadStartMessage(fileName) {
    if (isAABFilePath(fileName)) {
        log('> Uploading App Bundle');
    }
    log('> Uploading APK');
}
exports.logAppUploadStartMessage = logAppUploadStartMessage;
function logAppUploadSuccessMessage(versionCode, filePath, sha1Hash) {
    log(getUploadSuccessMessage(filePath, versionCode, sha1Hash));
}
exports.logAppUploadSuccessMessage = logAppUploadSuccessMessage;
function getUploadSuccessMessage(filePath, versionCode, sha1Hash) {
    return '> Uploaded ' + filePath + ' with version code ' + versionCode + ' and SHA1 ' + sha1Hash;
}
function isAABFilePath(path) {
    return path.endsWith('.aab');
}
exports.isAABFilePath = isAABFilePath;
//# sourceMappingURL=Utilities.js.map
