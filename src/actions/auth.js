import { firebase, googleAuthProvider, createUser, logInUser } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startCreateUser = (email, password) => () => {
  return createUser(email, password)
}

export const startEmailLogin = (email, password) => () => {
  return logInUser(email, password)
}

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export const autoLogout = () => {
  
  this.firebaseAuth.onAuthStateChanged((user) => {
  let userSessionTimeout = null;

  if (user === null && userSessionTimeout) {
    clearTimeout(userSessionTimeout);
    userSessionTimeout = null;
  } else {
    user.getIdTokenResult().then((idTokenResult) => {
      const authTime = idTokenResult.claims.auth_time * 1000;
      const sessionDurationInMilliseconds = 1 * 60 * 1000; // 1 min
      const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
      userSessionTimeout = setTimeout(() => this.firebaseAuth.signOut(), expirationInMilliseconds);
    });
  }
});
};