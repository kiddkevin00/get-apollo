import actionTypes from '../actionTypes/';
import { firebaseAuth, firebaseAuthProviders } from '../utils/firebaseClient';
import { User } from '../utils/firebase/user';
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

  signInAnonymously(navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        await firebaseAuth.signInAnonymouslyAndRetrieveData();

        navigation.replace('home');

        dispatch(this.updateDataSuccess());
      } catch ({ code: errorCode, message: errorMsg }) {
        let errorMessage;

        if (errorCode === 'auth/operation-not-allowed') {
          errorMessage = 'You must enable Anonymous auth in the Firebase Console';
        } else {
          errorMessage = errorMsg;
        }
        Alert.alert('Try Again', errorMessage);

        dispatch(this.updateDataFailure(errorMsg));
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

          dispatch(this.setData({ email: user.email, uid: user.uid }));

          navigation.navigate(
            'profile',
            {},
            NavigationActions.push({ routeName: 'termsAndConditions' })
          );

          dispatch(this.updateDataSuccess());
        }

        dispatch(this.updateDataFailure('Something went wrong while signing in with Facebook'));
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.updateDataFailure(errorMsg));
      }
    };
  },

  loadUserInfo() {
    return async dispatch => {
      try {
        dispatch(this.loadDataRequest());

        const user = await User.getCurrentUser(); // TODO Replace this
        const profile = await user.profile();

        dispatch(this.setData({ ...profile }));

        dispatch(this.loadDataSuccess());
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.loadDataFailure(errorMsg));
      }
    };
  },

  saveUserInfo(userInfo) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        const user = await User.getCurrentUser(); // TODO Replace this

        await user.ref.set(userInfo, { merge: true });

        dispatch(this.setData({ ...userInfo }));

        dispatch(this.updateDataSuccess());
      } catch ({ message: errorMsg }) {
        Alert.alert('Try Again', errorMsg);

        dispatch(this.updateDataFailure(errorMsg));
      }
    };
  },
};

export { authActionCreator as default };
