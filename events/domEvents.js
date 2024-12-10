/* eslint-disable */
import { getOrders, deleteOrder } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import showItems from "../Dom/orderDetail";
import { getItem } from "../api/apiItems";
import { deleteItem } from "../api/apiItems";
import revenueBuilder from "../Dom/revenuePage";
import getRevenue from "../api/apiRevenue";

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    e.preventDefault();
    
    //VIEW ORDERS PAGE
    if (e.target.id.includes('view-order-btn')) {
      getOrders(user.uid).then(showOrders);
    }

    //VIEW REVENUE PAGE
    if (e.target.id.includes('view-revenue')) {
      getRevenue().then((closedOrders) => revenueBuilder(closedOrders));
    }

    //VIEW ORDER DETAILS
    if (e.target.id.includes('details-order-btn')) {
        const [, firebaseKey] = e.target.id.split('__');
        getItem(firebaseKey).then((items) => showItems(items))
    }

    //DELETE ORDER
    if (e.target.id.includes('delete-order-btn')) {
      if (window.confirm('Are you sure you want to delete this order?')) {
        const [, firebaseKey] = e.target.id.split('__');
        deleteOrder(firebaseKey).then(() => {
          getOrders(user.uid).then(showOrders);
        });
      }
    }

    //DELETE ITEM
    if (e.target.id.includes('delete-item-btn')) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        const [, firebaseKey, orderFirebaseKey] = e.target.id.split('__');
        deleteItem(firebaseKey).then(() => {
          getItem(orderFirebaseKey).then((items) => showItems(items));
        });
      }
    }

  });
}

export default domEvents;
