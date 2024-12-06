/* eslint-disable */
import logoutButton from '../components/logoutButton';
import homeBuilder from '../Dom/homeScreen';
import showItems from '../Dom/orderDetail';

const startApp = (user) => {
    console.log("User UID:", user.uid);
    logoutButton();
    homeBuilder(); 
    // showItems(user.uid); 
};
  
  export default startApp;