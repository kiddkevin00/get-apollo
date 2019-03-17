import * as firebaseClient from 'firebase';
import 'firebase/firestore'; // make sure you add this for firestore

const config = {
  apiKey: 'AIzaSyDsHj_BcB71-6LD5G5VKOCRbE34GdcZp4s',
  authDomain: 'get-apollo-staging-ad29c.firebaseapp.com',
  databaseURL: 'https://get-apollo-staging-ad29c.firebaseio.com',
  projectId: 'get-apollo-staging-ad29c',
  storageBucket: 'get-apollo-staging-ad29c.appspot.com',
  messagingSenderId: '130921570547',
};

firebaseClient.initializeApp(config);

// Initialize Firestore with timeshot settings
firebaseClient.firestore().settings({ timestampsInSnapshots: true });

export const firebaseDb = firebaseClient.database();
export const firebaseAuth = firebaseClient.auth();
export const firebaseAuthProviders = firebaseClient.auth;
export { firebaseClient as default };
