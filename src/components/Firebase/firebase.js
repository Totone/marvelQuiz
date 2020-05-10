import app from 'firebase/app'; // get Firebase
import 'firebase/auth'; // enables Firebase authentication feature
import 'firebase/firestore'; // enables Firebase db service
import config from '../../assets/config/firebase'; // get stored config

/** Configures Firebase service to be handled in app */
class Firebase {
  /**
   * Initializes Firebase with project config
   * & assignes authentication & database
   * services to auth & db class properties
   */
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  /** API requests methods declared to access service */
  signupUser = (email, pswd) => this.auth.createUserWithEmailAndPassword(email, pswd);
  loginUser = (email, pswd) => this.auth.signInWithEmailAndPassword(email, pswd);
  signoutUser = () => this.auth.signOut();
  resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

  user = uid => this.db.doc(`users/${uid}`);

};

export default Firebase;
