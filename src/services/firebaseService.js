import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const registerUserWithEmail = (email, pass) => {
  auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(user => {
      Alert.alert('Success', JSON.stringify(user));
    })
    .catch(error => {
      Alert.alert('Failed', JSON.stringify(error.message));
    });
};

const loginWithEmail = (email, pass) => {
  auth()
    .signInWithEmailAndPassword(email, pass)
    .then(user => {
      Alert.alert('Success', JSON.stringify(user));
    })
    .catch(error => {
      Alert.alert('Failed', JSON.stringify(error.message));
    });
};

const resetPassword = email => {
  auth()
    .sendPasswordResetEmail(email)
    .then(data => {
      Alert.alert('Success', JSON.stringify(data));
    })
    .catch(error => {
      Alert.alert('Failed', JSON.stringify(error.message));
    });
};

const logout = () => {
  auth()
    .signOut()
    .then(() => {})
    .catch(() => {});
};

const signInWithGoogle = async (callback = () => {}) => {
  try {
    await GoogleSignin.hasPlayServices();

    const isSignediN = await GoogleSignin.isSignedIn();
    if (isSignediN) {
      await GoogleSignin.revokeAccess();
    }
    const {idToken, user} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const fullName = user.name;
    const Email = user.email;
    auth()
      .signInWithCredential(googleCredential)
      .then(async user => {
        if (user.user.uid) {
          const exists = await firestore()
            .collection('users')
            .doc(user.user.uid)
            .get();
          if (exists.exists) {
          } else {
            storeUserDataToDatabase(fullName, Email, user.user.uid);
            callback({
              fullName,
              Email,
              userId: user.user.uid,
            });
          }
        }
      });
  } catch (error) {
    Alert.alert('Failed', JSON.stringify(error.message));
  }
};

const storeUserDataToDatabase = async (fullName, Email, userId) => {
  await firestore().collection('users').doc(userId).set({
    fullName,
    Email,
    userId,
  });
};
export {
  registerUserWithEmail,
  logout,
  loginWithEmail,
  resetPassword,
  signInWithGoogle,
};
