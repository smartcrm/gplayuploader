import { BasicUploadParameters } from 'GPlayUploader/AndroidPublisherAPI/InterfaceTypes/BasicUploadParameters';

export interface ObbUploadParameters extends BasicUploadParameters {
    versionCodes: number[];
}
