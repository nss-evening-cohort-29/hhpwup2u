/* eslint-disable */
import { deleteOrder, getOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import showItems from "../Dom/orderDetail";
import { getItem } from "../api/apiItems";


const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    e.preventDefault();
    
    //SECTION FOR VIEW ORDER CLICK
    if (e.target.id.includes('view-order-btn')) {
        getOrders(user.uid).then(showOrders);
    }

    //SECTION FOR Create ITEM CLICK
    if (e.target.id.includes('details-order-btn')) {
        const [, firebaseKey] = e.target.id.split('__');
        getItem(firebaseKey).then((items) => showItems(items))
    }

    
    //SECTION FOR DELETE
    if(e.target.id.includes('delete-order-btn')) {
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteOrder(firebaseKey, user.uid).then(() => {
          getOrders(user.uid).then(showOrders);
        });
      }
    }

  })
}

export default domEvents;
