import { google } from 'googleapis';
import { GPlayAuthenticator } from 'GPlayUploader/AndroidPublisherAPI/GPlayAuthenticator';
import { AndroidPublisherV3 } from 'GPlayUploader/AndroidPublisherAPI/Implementations/AndroidPublisherV3';
import { UploadConfigGeneratorV3 } from 'GPlayUploader/AndroidPublisherAPI/Implementations/UploadConfigGeneratorV3';

export class GPlayAuthenticatorV3 implements GPlayAuthenticator {
    async authenticate(authenticationPath: string): Promise<AndroidPublisherV3> {
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
        return new AndroidPublisherV3(publisher, new UploadConfigGeneratorV3());
    }
}
