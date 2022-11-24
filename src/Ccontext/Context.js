import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";

export const myContext = createContext();
const auth = getAuth(app);

const Context = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  // const [expandMenu, setExpandMenu] = useState(false);
  const googleAuthProvider = new GoogleAuthProvider();

  const regWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailPass = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LoginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const updateUserinfo = (name, photo, accountType) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
      accountType: accountType,
    });
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });

    return () => unSubscribe();
  }, []);

  return (
    <myContext.Provider
      value={{
        user,
        setUser,
        loader,
        regWithEmailPass,
        LoginWithGoogle,
        loginWithEmailPass,
        updateUserinfo,
        signOutUser,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default Context;
