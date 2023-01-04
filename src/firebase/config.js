import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCpusOS11ci97v2dyGr56u3vl_Fp28s04w",
    authDomain: "cooking-ninja-site-f08d2.firebaseapp.com",
    projectId: "cooking-ninja-site-f08d2",
    storageBucket: "cooking-ninja-site-f08d2.appspot.com",
    messagingSenderId: "359518635535",
    appId: "1:359518635535:web:0869677326160f9ef4c57a"
  }

  //initial firebase
firebase.initializeApp(firebaseConfig)

//initial services
const projectFirestore = firebase.firestore()

//Export
export { projectFirestore }