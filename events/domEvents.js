/* eslint-disable */
import { GetOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import showItems from "../Dom/orderDetail";
import getItem from "../api/apiItems";

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    e.preventDefault();
    
    //SECTION FOR VIEW ORDER CLICK
    if (e.target.id.includes('view-order-btn')) {
        GetOrders(user.uid).then(showOrders);
    }

    //SECTION FOR Create ORDER CLICK
    if (e.target.id.includes('details-order-btn')) {
        const [, firebaseKey] = e.target.id.split('__');
        getItem(firebaseKey).then((items) => showItems(items))
    }

    //SECTION FOR DELETE


  })
}

export default domEvents;
