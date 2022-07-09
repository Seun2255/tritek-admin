import app from "../../firebase/firebaseApp";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { async } from "@firebase/util";

const db = getFirestore(app);
const auth = getAuth(app);

const signUserIn = async (email, password) => {
  var result;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed IN");
      // return user;
      return true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not signed in", errorMessage);
      return false;
    });
};

const signIn = async (email, password) => {
  const result = await signUserIn(email, password);
  return result;
};

const signUserOut = () => {
  signOut(auth)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed Out");
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not signed out", errorMessage);
      return false;
    });
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

const resetPasswordConfirmation = async (password, code) => {
  await confirmPasswordReset(auth, code, password);
};

export { signIn, signUserOut, auth, resetPassword, resetPasswordConfirmation };
