import firebase from 'firebase/app';
import 'firebase/auth';
import loginScreen from '../components/loginScreen';
import client from './client';
import startApp from './startApp';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in start application
      startApp(user);
    } else {
      // person is NOT logged in
      loginScreen();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
