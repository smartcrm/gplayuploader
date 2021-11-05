import { AndroidPublisher } from './AndroidPublisher';
/**
 * Authenticator that communicates with the google API and returns a implementation of the interface
 * 'AndroidPublisherAPI'. Re-implement this interface if you want to update the GoogleAPIs version and/or the version
 * of the publisher API from android.
 */
export interface GPlayAuthenticator {
    authenticate(authenticationPath: string): Promise<AndroidPublisher>;
}
