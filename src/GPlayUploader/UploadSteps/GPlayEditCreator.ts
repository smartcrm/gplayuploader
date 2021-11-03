import { AndroidPublisher } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisher';
import { log } from 'GPlayUploader/UploadSteps/Utilities/Utilities';

export class GPlayEditCreator {
    private readonly publisher: AndroidPublisher;

    constructor(publisher: AndroidPublisher) {
        this.publisher = publisher;
    }

    async getEditId(packageName: string): Promise<string> {
        log('> Creating edit');
        const editId = this.publisher.generateEditId(packageName);
        log(`> Created edit with id ${editId}`);
        return editId;
    }
}
