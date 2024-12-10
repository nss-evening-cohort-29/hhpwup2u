/* eslint-disable */
import logoutButton from '../components/logoutButton';
import homeBuilder from '../Dom/homeScreen';
import showItems from '../Dom/orderDetail';
import buildNavBar from '../NavBar/NavBar.js';
import domEvents from '../events/domEvents.js';
import navEvent from '../events/navEvents.js';
import domBuilder from '../Dom/theWholeWebFrame.js';

const startApp = (user) => {
    console.log("User UID:", user.uid);
    domBuilder()
    buildNavBar();
    homeBuilder(user); 
    logoutButton();
    domEvents(user);
    navEvent(user)
    // showItems(user.uid); 
};
  
  export default startApp;
