#!/usr/bin/env node

import { Command } from 'commander';
import { GPlayUploaderConfig } from './GPlayUploader/GPlayUploaderConfig';
import { GPlayUploader } from './GPlayUploader/GPlayUploader';

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
            .option('-f, --apkFilePaths <path/to.apk>', 'APKs to upload', this.collectParameterValues)
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
        const gPlayUploader: GPlayUploader = new GPlayUploader(config);
        return await gPlayUploader.start();
    }
}

CLIRunner.run();
