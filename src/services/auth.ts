import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage, };
    });
};

export const doGoogleSignInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, googleProvider);

  return result;
};

export const doSignOut = async () => {
  return auth
    .signOut()
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};
