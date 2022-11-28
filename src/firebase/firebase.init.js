// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCB2EHtA8Td0zcc3PLH4lWCaHGCP9U4HQM",
//   authDomain: "resellerhub-ecb94.firebaseapp.com",
//   projectId: "resellerhub-ecb94",
//   storageBucket: "resellerhub-ecb94.appspot.com",
//   messagingSenderId: "763431148493",
//   appId: "1:763431148493:web:9db11faf75593e10d74284",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
