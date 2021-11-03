import { readManifest } from 'node-aab-parser';
import ApkReader from 'adbkit-apkreader';
import { isAABFilePath, log } from 'GPlayUploader/UploadSteps/Utilities/Utilities';

export class ManifestParser {
    async getPackageNameFromManifest(pathToPackage): Promise<string> {
        log('> Parsing manifest');
        const packageName = await this.parseManifestAndReturnPackageName(pathToPackage);
        log(`> Detected package name ${packageName}`);
        return packageName;
    }

    private async parseManifestAndReturnPackageName(pathToPackage: string) {
        if (isAABFilePath(pathToPackage)) {
            const manifest = await readManifest(pathToPackage);
            return manifest.packageName;
        }
        const manifest = await ApkReader.open(pathToPackage).readManifest();
        return await manifest.package;
    }
}
