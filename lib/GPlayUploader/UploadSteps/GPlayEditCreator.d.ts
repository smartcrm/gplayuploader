import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
export declare class GPlayEditCreator {
    private readonly publisher;
    constructor(publisher: AndroidPublisher);
    getEditId(packageName: string): Promise<string>;
}
