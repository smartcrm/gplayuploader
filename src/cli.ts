#!/usr/bin/env node

import { Command } from 'commander';
import { GPlayUploaderConfig } from 'GPlayUploader/GPlayUploaderConfig';
import { GPlayUploadProcess } from 'GPlayUploader/GPlayUploadProcess';
import { GPlayAuthenticatorV3 } from 'GPlayUploader/AndroidPublisherAPI/Implementations/GPlayAuthenticatorV3';
import { GPlayEditCreator } from 'GPlayUploader/UploadSteps/GPlayEditCreator';
import { GPlayUploadCompleter } from 'GPlayUploader/UploadSteps/GPlayUploadCompleter';
import { ManifestParser } from 'GPlayUploader/UploadSteps/ManifestParser';
import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { GPlayFileUploader } from 'GPlayUploader/UploadSteps/GPlayFileUploader';

class CLIRunner {
    static async run() {
        try {
            const _cliRunner: CLIRunner = new CLIRunner();
            await _cliRunner.main();
        } catch (error) {
            process.exit(1);
        }
    }

    // Main method of the application
    async main() {
        const program: Command = CLIRunner.configureProgram();
        try {
            const config: GPlayUploaderConfig = CLIRunner.getConfig(program);
            if (config.isValidConfig()) {
                await CLIRunner.runGPlayUploader(config);
            }
        } catch (error) {
            program.outputHelp();
            throw error;
        }
    }

    private static configureProgram() {
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
            .option('-r, --recentChanges [message]', 'Recent changes message', CLIRunner.collectParameterValues)
            .option(
                '-f, --filePaths <path/to.app>..<path/>to.app>',
                'path to apk or app bundle',
                CLIRunner.collectParameterValues
            )
            .option(
                '-o, --obbFilePaths <path/to.obb>..<path/to.obb>',
                'OBBs to upload (optional)',
                CLIRunner.collectParameterValues
            )
            .option('-p, --rootPath <rootPath>', 'Working path', process.cwd())
            // .option('-l, --logLevel', 'Sets log level')
            .parse(process.argv);

        return program;
    }

    private static collectParameterValues(value: string, previous: string[]) {
        if (!Array.isArray(previous)) {
            previous = [];
        }
        return previous.concat([value]);
    }

    private static getConfig(parameters) {
        return new GPlayUploaderConfig(parameters);
    }

    // Main method to instantiate GPlayUploadProcess and its dependencies
    private static async runGPlayUploader(config: GPlayUploaderConfig) {
        console.log('Hi');
        const authenticator = new GPlayAuthenticatorV3();
        const publisherAPI: AndroidPublisher = await authenticator.authenticate(config.authenticationPath);

        const manifestParser: ManifestParser = new ManifestParser();
        const editCreator: GPlayEditCreator = new GPlayEditCreator(publisherAPI);
        const fileUploader: GPlayFileUploader = new GPlayFileUploader(publisherAPI);
        const uploadCompleter: GPlayUploadCompleter = new GPlayUploadCompleter(publisherAPI);

        const uploadProcess: GPlayUploadProcess = new GPlayUploadProcess(
            manifestParser,
            editCreator,
            fileUploader,
            uploadCompleter
        );
        return await uploadProcess.start(config);
    }
}

CLIRunner.run();
