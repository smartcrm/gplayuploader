import { androidpublisher_v3 as PublisherAPI } from 'googleapis';

// new type names for better readability
export type AndroidPublisher = PublisherAPI.Androidpublisher;
export type ApkUploadConfiguration = PublisherAPI.Params$Resource$Edits$Apks$Upload;
export type AabUploadConfiguration = PublisherAPI.Params$Resource$Edits$Bundles$Upload;

export type ApkUploadResult = PublisherAPI.Schema$Apk;
export type BundleUploadResult = PublisherAPI.Schema$Bundle;
export type ObbUploadResult = PublisherAPI.Schema$ExpansionFilesUploadResponse;

// Abstracted type for both upload configuration objects. Both types are nearly identical
export type GPlayUploadConfiguration = ApkUploadConfiguration | AabUploadConfiguration;

export type UploadConfiguration = {
    packageName: string;
    editId: string;
    mimeType?: string;
    versionCodes?: number[];
};
