import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAophIzkmIS1FnRrNP16h6Mw3EHrm0mIRA",
    authDomain: "studybuddies-b7ced.firebaseapp.com",
    projectId: "studybuddies-b7ced",
    storageBucket: "studybuddies-b7ced.appspot.com",
    messagingSenderId: "58937296334",
    appId: "1:58937296334:web:3d0097a2710078a97e979f",
    measurementId: "G-WRPZ3RX5B7"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };