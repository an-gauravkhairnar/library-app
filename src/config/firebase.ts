import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBd2pCCeGn--sAkwCfOvqrpCt1gpMU64eY",
  authDomain: "librarymanagementapp-f25cb.firebaseapp.com",
  projectId: "librarymanagementapp-f25cb",
  storageBucket: "librarymanagementapp-f25cb.appspot.com",
  messagingSenderId: "139580095997",
  appId: "1:139580095997:web:5dc56fea20279afb4aed94"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth, db, firebase };
