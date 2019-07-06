import actionTypes from '../actionTypes/';
import firebaseClient, { firebaseAuth, firebaseAuthProviders } from '../utils/firebaseClient';
import { noop } from '../constants/misc';
import { Facebook } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';

const { AUTH } = actionTypes;

const authActionCreator = {
  resetState() {
    return {
      type: AUTH.RESET_STATE,
    };
  },

  loadDataRequest() {
    return {
      type: AUTH.LOAD_DATA.REQUEST,
    };
  },

  loadDataSuccess() {
    return {
      type: AUTH.LOAD_DATA.SUCCESS,
    };
  },

  loadDataFailure(errorMsg) {
    return {
      type: AUTH.LOAD_DATA.FAILURE,
      payload: errorMsg,
    };
  },

  updateDataRequest() {
    return {
      type: AUTH.UPDATE_DATA.REQUEST,
    };
  },

  updateDataSuccess() {
    return {
      type: AUTH.UPDATE_DATA.SUCCESS,
    };
  },

  updateDataFailure(errorMsg) {
    return {
      type: AUTH.UPDATE_DATA.FAILURE,
      payload: errorMsg,
    };
  },

  setData(payload) {
    return {
      type: AUTH.SET_DATA,
      payload,
    };
  },

  loadUserInfo(uid) {
    return async dispatch => {
      let userInfo = {};

      try {
        dispatch(this.loadDataRequest());

        const userDoc = await firebaseClient
          .firestore()
          .collection('users')
          .doc(uid)
          .get();

        if (userDoc.exists) {
          userInfo = userDoc.data();

          dispatch(this.setData(userInfo));
        }

        dispatch(this.loadDataSuccess());
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.loadDataFailure(errorMsg));
      }

      return userInfo;
    };
  },

  signInAnonymously(navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        await firebaseAuth.signInAnonymously();

        navigation.replace('guestProfile');

        dispatch(this.updateDataSuccess());
      } catch ({ code: errorCode, message: errorMsg }) {
        let errorMessage;

        if (errorCode === 'auth/operation-not-allowed') {
          errorMessage = 'You must enable Anonymous auth in the Firebase Console';
        } else {
          errorMessage = errorMsg;
        }
        Alert.alert('Try Again', errorMessage);

        dispatch(this.updateDataFailure(errorMessage));
      }
    };
  },

  signInWithFacebook(navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        const { type, token: accessToken } = await Facebook.logInWithReadPermissionsAsync(
          '311204689692708',
          {
            permissions: ['public_profile', 'email'],
          }
        );

        if (type === 'success') {
          const credential = firebaseAuthProviders.FacebookAuthProvider.credential(accessToken);
          const { user } = await firebaseAuth.signInAndRetrieveDataWithCredential(credential);

          await dispatch(
            this.saveUserInfo(
              user.uid,
              JSON.parse(
                JSON.stringify({
                  uid: user.uid,
                  email: user.providerData[0] && user.providerData[0].email,
                  displayName: user.providerData[0] && user.providerData[0].displayName,
                  photoUrl: user.providerData[0] && user.providerData[0].photoURL,
                  providerId: user.providerData[0] && user.providerData[0].providerId,
                })
              )
            )
          );

          navigation.push('termsAndConditions');

          dispatch(this.updateDataSuccess());
        } else {
          dispatch(this.updateDataFailure('Signing-in with Facebook got cancelled'));
        }
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.updateDataFailure(errorMsg));
      }
    };
  },

  saveUserInfo(uid, userInfo, onSuccess = noop) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        await firebaseClient
          .firestore()
          .collection('users')
          .doc(uid)
          .set(userInfo, { merge: true });

        dispatch(this.setData(userInfo));

        await onSuccess();

        dispatch(this.updateDataSuccess());
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.updateDataFailure(errorMsg));
      }
    };
  },
};

export { authActionCreator as default };
