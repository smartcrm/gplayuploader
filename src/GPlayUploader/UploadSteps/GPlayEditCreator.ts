import { AndroidPublisher } from 'GPlayUploader/Utilities/Types';

export class GPlayEditCreator {
    private readonly publisher: AndroidPublisher;
    e;
    constructor(publisher: AndroidPublisher) {
        this.publisher = publisher;
    }

    async createEdit(packageName: string): Promise<string> {
        log('> Creating edit');
        const edit = await this.publisher.edits.insert({ packageName: packageName });
        const editId = edit.data.id;
        log(`> Created edit with id ${editId}`);
        return editId;
    }
}
