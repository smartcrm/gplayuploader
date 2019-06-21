#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

clear();
console.log(
    chalk.green(figlet.textSync("gpu-cli", { horizontalLayout: "full" }))
);

program
    .description("How to use google-play-uploader")
    .option(
        "-c, --config <file>",
        "Configuration file for google-play-uploader"
    )
    .option("-t, --track <track>", "Track for uploading")
    .option(
        "-a, --auth <authentication.json>",
        "JSON file that contains private key and client email"
    )
    .option("-r, --recentChanges <message>", "Recent changes message")
    .option("-f, --apkFile <path/to.apk>", "APK to upload")
    .option("-o, --obbFile <path/to.obb>", "OBB to upload")
    .parse(process.argv);

console.log("you ordered a pizza with:");
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

console.log(program.config);
console.log(program.track);
console.log(program.auth);
console.log(program.recentChanges);
console.log(program.apkFile);
console.log(program.obbFile);
