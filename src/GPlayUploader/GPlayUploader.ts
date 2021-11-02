import ApkReader from 'adbkit-apkreader';
import { readManifest } from 'node-aab-parser';
import { createReadStream } from 'fs';
import { google } from 'googleapis';
import { GPlayUploaderConfig } from './GPlayUploaderConfig';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

export class GPlayUploader {
    private _gPlayUploaderConfig: GPlayUploaderConfig;

    private packageName: string = '';
    private versionCodes: string[] = [];
    private editId: string = '';
    private publisher: any;

    constructor(gPlayUploaderConfig: GPlayUploaderConfig) {
        this._gPlayUploaderConfig = gPlayUploaderConfig;
    }

    async start() {
        try {
            await this.parseManifest();
            this.publisher = await this.authenticate();
            await this.createEdit();
            await this.uploadMultiplePaths(this._gPlayUploaderConfig.apkFilePaths, (apkFilePath) => {
                return this.uploadSingleAPK(apkFilePath);
            });
            await this.uploadMultiplePaths(this._gPlayUploaderConfig.obbFilePaths, (obbFilePath) => {
                return this.uploadSingleOBB(obbFilePath);
            });
            await this.assignTrackAndReleaseNotes();
            await this.commitChanges();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async parseManifest() {
        this._logger('> Parsing manifest');
        this.packageName = await this.getPackageNameFromManifest(this._gPlayUploaderConfig.apkFilePaths[0]);
        this._logger(`> Detected package name ${this.packageName}`);
    }

    async getPackageNameFromManifest(pathToPackage: string) {
        if (this.isAABFilePath(pathToPackage)) {
            const manifest = await readManifest(pathToPackage);
            return manifest.packageName;
        }
        const manifest = await ApkReader.open(pathToPackage).readManifest();
        return await manifest.package;
    }

    isAABFilePath(path: string): boolean {
        return path.endsWith('.aab');
    }

    async authenticate() {
        this._logger('> Authenticating');
        const client = await google.auth.getClient({
            keyFile: this._gPlayUploaderConfig.authenticationPath,
            scopes: 'https://www.googleapis.com/auth/androidpublisher'
        });

        const publisher = google.androidpublisher({
            version: 'v3',
            auth: client
        });

        this._logger('> Authenticated succesfully');

        return publisher;
    }

    async createEdit() {
        this._logger('> Creating edit');
        const edit = await this.publisher.edits.insert({ packageName: this.packageName });
        this.editId = edit.data.id;
        this._logger(`> Created edit with id ${this.editId}`);
        return edit;
    }

    async uploadMultiplePaths(pathsToUpload, uploadSinglePathFunction) {
        const uploadQue: Promise<any>[] = [];

        pathsToUpload.forEach((filePath) => {
            const newUpload: Promise<any> = uploadSinglePathFunction(filePath);
            uploadQue.push(newUpload);
        });

        return Promise.all(uploadQue);
    }

    async uploadSingleAPK(apkFilePath) {
        this._logger(`> Uploading APK`);

        const uploadApkConfig = {
            packageName: this.packageName,
            editId: this.editId,
            media: {
                mimeType: 'application/vnd.android.package-archive',
                body: createReadStream(apkFilePath)
            }
        };
        const apkUpload = await this.publisher.edits.apks.upload(uploadApkConfig);
        this.versionCodes.push(apkUpload.data.versionCode);
        this._logger(
            `> Uploaded ${apkFilePath} with version code ${apkUpload.data.versionCode} and SHA1 ${apkUpload.data.binary.sha1}`
        );
        return apkUpload;
    }

    async uploadSingleOBB(obbFilePath) {
        this._logger(`> Uploading  expansion file(s)`);
        const obbUploadConfig = {
            packageName: this.packageName,
            editId: this.editId,
            // TODO: find out a petter way to set up the right versioncodes.
            apkVersionCode: this.versionCodes[0],
            expansionFileType: 'main',
            media: {
                mimeType: 'application/octet-stream',
                body: createReadStream(obbFilePath)
            }
        };
        const obbUpload = await this.publisher.edits.expansionfiles.upload(obbUploadConfig);
        return obbUpload;
    }

    async assignTrackAndReleaseNotes() {
        this._logger(`> Assigning APK to ${this._gPlayUploaderConfig.track} track`);

        const newTrackConfig = {
            packageName: this.packageName,
            editId: this.editId,
            track: this._gPlayUploaderConfig.track,
            resource: {
                track: this._gPlayUploaderConfig.track,
                releases: [
                    {
                        versionCodes: this.versionCodes,
                        releaseNotes: this.getReleaseNotes(),
                        status: 'completed'
                    }
                ]
            }
        };

        const newTrack = await this.publisher.edits.tracks.update(newTrackConfig);
        this._logger(`> Assigned APK to ${newTrack.track} track`);
        return newTrack;
    }

    getReleaseNotes() {
        const newReleaseNotes = [];
        this._logger(`> Adding release notes`);

        return newReleaseNotes;
    }

    async commitChanges() {
        this._logger('> Commiting changes');
        const commitedChanges = await this.publisher.edits.commit({
            editId: this.editId,
            packageName: this.packageName
        });
        this._logger('> Commited changes');
        return commitedChanges;
    }

    _logger(message: string) {
        console.log(message);
    }
}
