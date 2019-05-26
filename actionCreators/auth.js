import actionTypes from '../actionTypes';
import { firebaseAuth, firebaseAuthProviders } from '../utils/firebaseClient';
import { Facebook } from 'expo';
import { NavigationActions } from 'react-navigation';

const { AUTH } = actionTypes;

const authActionCreator = {
  updateDataRequest() {
    return {
      type: AUTH.UPDATE_DATA.REQUEST,
    };
  },

  updateDataFailure(errorMsg) {
    return {
      type: AUTH.UPDATE_DATA.FAILURE,
      payload: errorMsg,
    };
  },

  updateDataSuccess() {
    return {
      type: AUTH.UPDATE_DATA.SUCCESS,
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

        await firebaseAuth.signInAnonymously();

        navigation.replace('home');

        dispatch(this.updateDataSuccess());
      } catch ({ code: errorCode, message: errorMsg }) {
        let errorMessage;

        if (errorCode === 'auth/operation-not-allowed') {
          errorMessage =
            'You must enable Anonymous auth in the Firebase Console';
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
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
          '311204689692708',
          {
            permissions: ['public_profile', 'email'],
          }
        );
        if (type === 'success') {
          // Build Firebase credential with the Facebook access token.
          const credential = firebaseAuthProviders.FacebookAuthProvider.credential(
            token
          );

          // Sign in with credential from the Facebook user.
          const {
            user,
          } = await firebaseAuth.signInAndRetrieveDataWithCredential(
            credential
          );

          dispatch(this.setData({ email: user.email, uid: user.uid }));
          navigation.navigate(
            'profile',
            {},
            NavigationActions.navigate({ routeName: 'termsAndConditions' })
          );
        }
        dispatch(this.updateDataSuccess());
      } catch (e) {
        Alert.alert('Try Again', e.message);
        dispatch(this.updateDataFailure(e.message));
      }
    };
  },
};

export { authActionCreator as default };
