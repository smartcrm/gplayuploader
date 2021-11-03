#!/usr/bin/env node

import { Command } from 'commander';
import { GPlayUploaderConfig } from './GPlayUploader/GPlayUploaderConfig';
import { GPlayUploader } from './GPlayUploader/GPlayUploader';
import { GPlayAuthenticator } from 'GPlayUploader/GPlayAuthenticator';
import { AndroidPublisher } from 'GPlayUploader/Utilities/Types';
import { GPlayEditCreator } from 'GPlayUploader/UploadSteps/GPlayEditCreator';
import { GPlayApkUploader } from 'GPlayUploader/UploadSteps/GPlayApkUploader';
import { GPlayBundleUploader } from 'GPlayUploader/UploadSteps/GPlayBundleUploader';
import { GPlayObbUploader } from 'GPlayUploader/UploadSteps/GPlayObbUploader';
import { GPlayUploadCompleter } from 'GPlayUploader/UploadSteps/GPlayUploadCompleter';
import { ManifestParser } from 'GPlayUploader/UploadSteps/ManifestParser';

class CLIRunner {
    static async run() {
        try {
            const _cliRunner: CLIRunner = new CLIRunner();
            await _cliRunner.main();
        } catch (error) {
            process.exit(1);
        }
    }

    async main() {
        const program: Command = this.configureProgram();
        try {
            const config: GPlayUploaderConfig = this.getConfig(program);
            if (config.isValidConfig()) {
                await this.runGPlayUploader(config);
            }
        } catch (error) {
            program.outputHelp();
            throw error;
        }
    }

    private configureProgram() {
        const program: Command = new Command();
        program
            .description('How to use gplayuploader')
            // .option('-c, --configFilePath <file>', 'Configuration file for gplayuploader')
            .option(
                '-t, --track [track]',
                `Track for uploading. Available tracks: ${GPlayUploaderConfig.allowedTracks}`
            )
            .option(
                '-a, --authenticationPath <path/to/authentication.json>',
                'JSON file that contains private key and client email'
            )
            .option('-r, --recentChanges [message]', 'Recent changes message', this.collectParameterValues)
            .option(
                '-f, --filePaths <path/to.apk>..<path/>to.aab>',
                'path to apk or app bundle',
                this.collectParameterValues
            )
            .option(
                '-o, --obbFilePaths <path/to.obb>..<path/to.obb>',
                'OBBs to upload (optional)',
                this.collectParameterValues
            )
            .option('-p, --rootPath <rootPath>', 'Working path', process.cwd())
            // .option('-l, --logLevel', 'Sets log level')
            .parse(process.argv);

        return program;
    }

    private collectParameterValues(value: string, previous: string[]) {
        if (!Array.isArray(previous)) {
            previous = [];
        }
        return previous.concat([value]);
    }

    private getConfig(parameters) {
        const config: GPlayUploaderConfig = new GPlayUploaderConfig(parameters);

        return config;
    }

    private async runGPlayUploader(config: GPlayUploaderConfig) {
        const publisher: AndroidPublisher = await GPlayAuthenticator.authenticate(config);

        const manifestParser: ManifestParser = new ManifestParser();
        const editCreator: GPlayEditCreator = new GPlayEditCreator(publisher);
        const apkUploader: GPlayApkUploader = new GPlayApkUploader(publisher);
        const bundleUploader: GPlayBundleUploader = new GPlayBundleUploader(publisher);
        const obbUploader: GPlayObbUploader = new GPlayObbUploader(publisher);
        const uploadCompleter: GPlayUploadCompleter = new GPlayUploadCompleter(publisher);

        const uploader: GPlayUploader = new GPlayUploader(
            manifestParser,
            editCreator,
            apkUploader,
            bundleUploader,
            obbUploader,
            uploadCompleter
        );
        return await uploader.start(config);
    }
}

CLIRunner.run();
