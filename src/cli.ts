#!/usr/bin/env node

import { Command } from 'commander';
import { GPlayUploaderConfig } from './GPlayUploader/GPlayUploaderConfig';
import { GPlayUploader } from './GPlayUploader/GPlayUploader';

class CLIRunner {
    static run() {
        const _cliRunner: CLIRunner = new CLIRunner();
        _cliRunner.main();
    }

    main() {
        const program: Command = this.configureProgram();
        this.runGPlayUploader(this.getConfig(program));
    }

    private configureProgram() {
        const program: Command = new Command();
        program
            .description('How to use gplayuploader')
            .option('-c, --configFile <file>', 'Configuration file for gplayuploader', '.gplayuploader.config.json')
            .option('-t, --track [track]', 'Track for uploading')
            .option(
                '-a, --authentication <path/to/authentication.json>',
                'JSON file that contains private key and client email'
            )
            .option('-r, --recentChanges [message]', 'Recent changes message', this.collectParameterValues)
            .option('-f, --apkFiles <path/to.apk>', 'APK to upload', this.collectParameterValues)
            .option('-o, --obbFiles <path/to.obb>..<path/to.obb>', 'OBB to upload', this.collectParameterValues)
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

    private runGPlayUploader(config: GPlayUploaderConfig) {
        const gPlayUploader: GPlayUploader = new GPlayUploader(config);
        gPlayUploader.start();
    }
}

CLIRunner.run();
