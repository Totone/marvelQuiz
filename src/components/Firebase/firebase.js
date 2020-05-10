import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

/**
 * Firebase sert d'API pour accéder au backend
 */
class Firebase {
  constructor() {
    app.initializeApp(config);    // initialize Firebase with project config
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // API for log in/out, signup & reset password
  signupUser = (email, pswd) => this.auth.createUserWithEmailAndPassword(email, pswd);
  loginUser = (email, pswd) => this.auth.signInWithEmailAndPassword(email, pswd);
  signoutUser = () => this.auth.signOut();
  resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

  user = uid => this.db.doc(`users/${uid}`);

};

export default Firebase;
