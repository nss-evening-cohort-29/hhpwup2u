/* eslint-disable */
import logoutButton from '../components/logoutButton';
import homeBuilder from '../Dom/homeScreen';
import showItems from '../Dom/orderDetail';
import buildNavBar from '../NavBar/NavBar.js';

const startApp = (user) => {
    console.log("User UID:", user.uid);
    buildNavBar();
    logoutButton();
    homeBuilder(); 
    // showItems(user.uid); 
};
  
  export default startApp;