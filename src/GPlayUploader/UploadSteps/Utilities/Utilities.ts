export function log(message: string) {
    console.log(message);
}

export function logAppUploadStartMessage(fileName: string) {
    if (isAABFilePath(fileName)) {
        log(`> Uploading App Bundle`);
    }
    log(`> Uploading APK`);
}

export function logAppUploadSuccessMessage(versionCode: number, filePath: string, sha1Hash: string): void {
    log(getUploadSuccessMessage(filePath, versionCode, sha1Hash));
}

function getUploadSuccessMessage(filePath: string, versionCode: number, sha1Hash: string): string {
    return `> Uploaded ${filePath} with version code ${versionCode} and SHA1 ${sha1Hash}`;
}

export function isAABFilePath(path: string): boolean {
    return path.endsWith('.aab');
}
