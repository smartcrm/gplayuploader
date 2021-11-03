import { FileUploadConfig } from 'GPlayUploader/AndroidPublisherAPI/Implementations/Utilities/FileUploadConfig';
export interface ObbUploadConfig extends FileUploadConfig {
    apkVersionCode: number;
    expansionFileType: string;
}
