import firebase from 'firebase/app';
import 'firebase/auth';
import loginScreen from '../components/loginScreen';
import logoutButton from '../components/logoutButton';
import client from './client';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in start application
      logoutButton();
    } else {
      // person is NOT logged in
      loginScreen();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
