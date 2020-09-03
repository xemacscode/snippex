import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZ_y33KFS4r1zCHPOJwGuv8OdSbDoxTMU",
  authDomain: "dorsusnippex.firebaseapp.com",
  databaseURL: "https://dorsusnippex.firebaseio.com",
  projectId: "dorsusnippex",
  storageBucket: "dorsusnippex.appspot.com",
  messagingSenderId: "642682731174",
  appId: "1:642682731174:web:6dd10b20b45bd4a9b3d267"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;
