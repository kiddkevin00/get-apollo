import firebaseClient from '../firebaseClient';

export class User {
  static fromFirebase(user) {
    return new User(user);
  }

  static getCurrentUser = async () => {
    return new User();
  };

  static signInAnonymously = async () => {
    await firebaseClient.auth().signInAnonymouslyAndRetrieveData();
  };

  constructor(user) {
    if (!user) {
      user = firebaseClient.auth().currentUser;
    }

    this.userID = user.uid;
    this.displayName = user.displayName;
  }

  set userID(userID) {
    if (!userID) {
      return;
    }
    this.ref = firebaseClient
      .firestore()
      .collection('users')
      .doc(userID);
    this.profile();
  }

  profile = async () => {
    if (!this.ref) {
      return null;
    }
    const userDoc = await this.ref.get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data();
  };

  saveProfile = async profile => {
    this.ref.set(profile, { merge: true });
  };

  completedSignUpFlow = async () => {
    const data = await this.profile();
    return (
      data &&
      data.termsAndConditions &&
      data.birthday !== null &&
      data.displayName !== null &&
      data.displayName.length > 0
    );
  };
}
