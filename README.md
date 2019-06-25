# gplayuploader

Upload APKs to Google Play

This package offers a streamlined way to publish packages in the Google Play Store

## Install

```bash
npm install -g gplayuploader
```

## Usage

Use the CLI

```bash
TODO: Write me
```

or the JavaScript API

```javascript
TODO: Write me
```

## Authentication

First you have to create a Google Play API Access. To do that go to the
[Google Play Developer Console](https://play.google.com/apps/publish) and then
with the account owner go to Settings -> API access and create a Google Play
Android Developer project.

After that follow the instructions to create a Service Account.
When you click Create Client ID, choose Service Account. You will get a JSON file
with a public key and the service email.

## CLI

### gplayuploader TODO: Write me

#### auth

_Required_
Type: `File`

a JSON file with the [Authentication information](#authentication)

#### recent-changes

_Required_
Type: `string`

A string with the format `lang=changes` where lang is the language code and changes the string that specifies the changes of this

#### track

Type: `string`

Specify track for this release. Can be alpha, beta, production or rollout. Default: alpha

#### APK

The path to the APK

#### OBB

The path to 1 or more expansion files
