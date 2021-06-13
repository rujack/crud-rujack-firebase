import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAXoVFAC53NtP5LYCWy3Zq3t2DBvmdJoLo",
  authDomain: "test-3504e.firebaseapp.com",
  projectId: "test-3504e",
  storageBucket: "test-3504e.appspot.com",
  messagingSenderId: "4977666567",
  appId: "1:4977666567:web:a5ef1df4a3d6a0d6c158a2",
  measurementId: "G-D4KY22KR1V",
  databaseURL: "https://test-3504e-default-rtdb.asia-southeast1.firebasedatabase.app"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

export default firebase;