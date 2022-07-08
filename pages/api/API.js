import app from "../../firebase/firebaseApp";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const signIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not signed in", errorMessage);
      return false;
    });
};

const signUserOut = () => {
  signOut(auth);
};

export { signIn, signUserOut };
