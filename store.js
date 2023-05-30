import { Store, registerInDevtools } from "pullstate";
import {
  onAuthStateChanged,
  signOut,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth/react-native";
import { auth } from "./firebase-config";

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

const unsub = onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChange", user);
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
    });
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
