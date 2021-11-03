import { FileUploadConfig } from './FileUploadConfig';
export interface ObbUploadConfig extends FileUploadConfig {
    apkVersionCode: number;
    expansionFileType: string;
}
