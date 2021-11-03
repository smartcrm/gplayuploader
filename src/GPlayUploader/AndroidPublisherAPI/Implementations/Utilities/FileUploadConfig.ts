import { ReadStream } from 'fs';

export interface FileUploadConfig {
    packageName: string;
    editId: string;
    media: {
        mimeType?: string;
        body: ReadStream;
    };
}
