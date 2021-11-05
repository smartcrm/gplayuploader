import { GPlayAuthenticator } from '../GPlayAuthenticator';
import { AndroidPublisherV3 } from './AndroidPublisherV3';
export declare class GPlayAuthenticatorV3 implements GPlayAuthenticator {
    authenticate(authenticationPath: string): Promise<AndroidPublisherV3>;
}
