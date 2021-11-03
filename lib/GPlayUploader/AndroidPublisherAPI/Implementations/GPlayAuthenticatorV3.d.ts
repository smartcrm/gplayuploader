import { GPlayAuthenticator } from 'GPlayUploader/AndroidPublisherAPI/GPlayAuthenticator';
import { AndroidPublisherV3 } from 'GPlayUploader/AndroidPublisherAPI/Implementations/AndroidPublisherV3';
export declare class GPlayAuthenticatorV3 implements GPlayAuthenticator {
    authenticate(authenticationPath: string): Promise<AndroidPublisherV3>;
}
