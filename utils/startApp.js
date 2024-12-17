/* eslint-disable */
import logoutButton from '../components/logoutButton';
import homeBuilder from '../Dom/homeScreen';
import showItems from '../Dom/orderDetail';
import buildNavBar from '../NavBar/NavBar.js';
import domEvents from '../events/domEvents.js';
import navEvent from '../events/navEvents.js';
import formEvents from '../events/formEvents.js'
import domBuilder from '../Dom/theWholeWebFrame.js';
import getAdmins from '../api/apiAdmins.js';
import { getArtistItems } from '../api/apiArtist.js';

const startApp = async (user) => {

    const admins = await getAdmins();
    let listAdmins = [] //SETS up a list that will have all the admins

    admins.forEach ((admin) => listAdmins.push(admin.AdminUid) ) //put all admin into an array so we can use .include
    
    if (listAdmins.includes(user.uid)) {
      console.warn("You are Logged in as an ADMIN")
      console.log("User UID:", user.uid);
      domBuilder()
      buildNavBar();
      getArtistItems().then ((artist) => homeBuilder(user, artist, 2));
      logoutButton();
      domEvents(user, 2);
      navEvent(user, 2);
      formEvents(user, 2);
    }
    
    
    else {
      console.warn("You are Logged in as a USER")
      console.log("User UID:", user.uid);
      domBuilder()
      buildNavBar();
      getArtistItems().then ((artist) => homeBuilder(user, artist)) ; 
      logoutButton();
      domEvents(user);
      navEvent(user);
      formEvents(user);
    }
};
  
  export default startApp;
