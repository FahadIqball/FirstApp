import auth from "@react-native-firebase/auth";
import { Alert } from "react-native"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const registerUserWithEmail = (email, pass) => {
    auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((user) => {
            Alert.alert('Success', JSON.stringify(user))

        })
        .catch((error) => {
            Alert.alert('Failed', JSON.stringify(error.message))
        })
}

const loginWithEmail = (email, pass) => {
    auth()
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
            Alert.alert('Success', JSON.stringify(user))

        })
        .catch((error) => {
            Alert.alert('Failed', JSON.stringify(error.message))
        })
}

const resetPassword = (email) => {
    auth()
    .sendPasswordResetEmail(email)
    .then((data) => {
        Alert.alert('Success', JSON.stringify(data))

    })
    .catch((error) => {
        Alert.alert('Failed', JSON.stringify(error.message))
    })
}

const logout = () => {
    auth()
        .signOut()
        .then(() => {

        })
        .catch(() => {

        })
}
  
    const signInWithGoogle = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const isSignediN = await GoogleSignin.isSignedIn()
        if (isSignediN) {
            await GoogleSignin.revokeAccess();
      }
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        console.log('User signed in with Google and Firebase');
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
          console.error(error);
        }
      }
    }


export {
    registerUserWithEmail,
    logout,
    loginWithEmail,
    resetPassword,
    signInWithGoogle,
} 