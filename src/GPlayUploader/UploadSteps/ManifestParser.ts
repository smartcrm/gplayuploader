import { readManifest } from 'node-aab-parser';
import ApkReader from 'adbkit-apkreader';
import { isAABFilePath, log } from 'GPlayUploader/UploadSteps/Utilities/Utilities';

export class ManifestParser {
    async getPackageNameFromManifest(pathToPackage): Promise<string> {
        log(`> Parsing manifest in path ${pathToPackage}`);
        const packageName: string = await this.parseManifestAndReturnPackageName(pathToPackage);
        log(`> Detected package name ${packageName}`);
        return packageName;
    }

    private async parseManifestAndReturnPackageName(pathToPackage: string): Promise<string> {
        if (isAABFilePath(pathToPackage)) {
            const manifest = await readManifest(pathToPackage);
            return manifest.packageName;
        }
        const apkReader = await ApkReader.open(pathToPackage);
        const manifest = await apkReader.readManifest();
        return await manifest.package;
    }
}
