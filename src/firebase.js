import Firebase from 'firebase';
import 'firebase/firestore';

let config = {
  apiKey: "AIzaSyBM4D13oDl41AApHEC2iaSkltLQKNkCbV0",
  authDomain: "tictactoe-1155e.firebaseapp.com",
  databaseURL: "https://tictactoe-1155e.firebaseio.com",
  projectId: "tictactoe-1155e",
  storageBucket: "tictactoe-1155e.appspot.com",
  messagingSenderId: "1017207469913"
};
const firebaseApp = Firebase.initializeApp(config);
export default firebaseApp.firestore();