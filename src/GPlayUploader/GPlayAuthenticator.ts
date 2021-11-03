import { google } from 'googleapis';
import { AndroidPublisher } from 'GPlayUploader/Utilities/Types';

export class GPlayAuthenticator {
    static async authenticate(authenticationPath): Promise<AndroidPublisher> {
        log('> Authenticating');
        const client = await google.auth.getClient({
            keyFile: authenticationPath,
            scopes: 'https://www.googleapis.com/auth/androidpublisher'
        });

        const publisher = google.androidpublisher({
            version: 'v3',
            auth: client
        });

        log('> Authenticated succesfully');
        return publisher;
    }
}
