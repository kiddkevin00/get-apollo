import * as firebaseClient from 'firebase';
import 'firebase/firestore'; // make sure you add this for firestore

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-auth-domain.firebaseapp.com',
  databaseURL: 'https://your-db-name.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'your-storage-bucket.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
};

firebaseClient.initializeApp(config);

// Initialize Firestore with timeshot settings
firebaseClient.firestore().settings({ timestampsInSnapshots: true });

export const firebaseDb = firebaseClient.database();
export const firebaseAuth = firebaseClient.auth();
export const firebaseAuthProviders = firebaseClient.auth;
export { firebaseClient as default };
