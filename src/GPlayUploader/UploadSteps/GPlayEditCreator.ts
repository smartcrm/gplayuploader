import { AndroidPublisherAPI } from 'GPlayUploader/AndroidPublisherAPI/AndroidPublisherAPI';
import { log } from 'GPlayUploader/UploadSteps/Utilities/Utilities';

export class GPlayEditCreator {
    private readonly publisher: AndroidPublisherAPI;

    constructor(publisher: AndroidPublisherAPI) {
        this.publisher = publisher;
    }

    async getEditId(packageName: string): Promise<string> {
        log('> Creating edit');
        const editId = this.publisher.generateEditId(packageName);
        log(`> Created edit with id ${editId}`);
        return editId;
    }
}
