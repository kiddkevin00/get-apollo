import * as firebaseClient from 'firebase';

// TODO
const config = {

};

firebaseClient.initializeApp(config);

export const firebaseDb = firebaseClient.database();
export const firebaseAuth = firebaseClient.auth();
export const firebaseAuthProviders = firebaseClient.auth;
export { firebaseClient as default };
