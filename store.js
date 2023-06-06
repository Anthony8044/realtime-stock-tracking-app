import { Store, registerInDevtools } from "pullstate";
import {
  onAuthStateChanged,
  signOut,
  PhoneAuthProvider,
  signInWithCredential,
  getAdditionalUserInfo,
} from "firebase/auth/react-native";
import { auth, db } from "./firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
  userDetails: "",
});

const unsub = onAuthStateChanged(auth, (user) => {
  // console.log("onAuthStateChange", user);
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
  });
});

export const phoneSignIn = async (verificationId, smsCode) => {
  const credential = PhoneAuthProvider.credential(verificationId, smsCode);
  try {
    const resp = await signInWithCredential(auth, credential);
    AuthStore.update((store) => {
      store.user = resp.user;
      store.isLoggedIn = resp.user ? true : false;
      store.userDetails = getAdditionalUserInfo(resp);
    });

    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    // Create user in firestore for the first time if user doesnt already exsist
    if (!userSnap.exists()) {
      try {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          userId: auth.currentUser.uid,
          watchList: [],
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.user = null;
      store.isLoggedIn = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

registerInDevtools({ AuthStore });
