/* eslint-disable */
import { getOrders, deleteOrder, getSingleOrder, getAllOrders, searchOrders, getOpen, getClosed } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import showItems from "../Dom/orderDetail";
import { getItem, getSingleItem } from "../api/apiItems";
import { deleteItem } from "../api/apiItems";
import revenueBuilder from "../Dom/revenuePage";
import { getRevenue } from "../api/apiRevenue";
import createOrderForm from "../Form/createOrderForm";
import createItemForm from "../Form/createItemForm";
import closeOrderForm from "../Form/closeOrderForm";

const domEvents = (user, admin) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    e.preventDefault();

    //VIEW ORDERS PAGE AS ADMIN
    if (e.target.id.includes('view-order-btn') && admin === 2) {
      getAllOrders().then(showOrders);
    }

    //VIEW ORDERS PAGE
    if (e.target.id.includes('view-order-btn')) {
      if (admin === 2) {
        getAllOrders().then(showOrders);
      }
      else (getOrders(user.uid).then(showOrders))
    }

    //VIEW REVENUE PAGE
    if (e.target.id.includes('view-revenue')) {
      getRevenue().then((closedOrders) => revenueBuilder(closedOrders));
    }

    // CREATE ORDER (DOM)
    if (e.target.id.includes('create-order')) {
      createOrderForm({});
    }

    // EDIT ORDER
    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('__');

      getSingleOrder(firebaseKey).then((orderObj) => createOrderForm(orderObj))
    }


    //Payment FORM
    if (e.target.id.includes('payment-order-btn')) {
      const [, firebaseKey, totalPrice] = e.target.id.split('--');
      closeOrderForm(firebaseKey, totalPrice)
    }

    //ADD ITEM FORM
    if (e.target.id.includes('add-item-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      createItemForm({},firebaseKey);
    }

    //Edit ITEM FORM
    if (e.target.id.includes('edit-item-btn')) {
      const [, itemfirebaseKey, orderFirebaseKey] = e.target.id.split('__');
      getSingleItem(itemfirebaseKey).then((itemObj) => createItemForm (itemObj, orderFirebaseKey) )

    }

    //VIEW ITEM DETAILS
    if (e.target.id.includes('details-order-btn')) {
       const [, firebaseKey, orderStatus] = e.target.id.split('__');
       getItem(firebaseKey).then((items) => showItems(items, firebaseKey, orderStatus))
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

    // DELETE ORDER AND ORDER ITEMS
    /*
    if (e.target.id.includes('delete-order-btn')) {
      if (window.confirm('Are you sure you want to delete this order? Items associated with this order will also be deleted.))
        }
    */

    //DELETE ITEM
    if (e.target.id.includes('delete-item-btn')) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        const [, firebaseKey, orderFirebaseKey] = e.target.id.split('__');
        deleteItem(firebaseKey).then(() => {
          getItem(orderFirebaseKey).then((items) => showItems(items));
        });
      }
    }

    // SEARCH ORDER VALUES
    document.querySelector('#search').addEventListener('keyup', () => {
    searchOrders(user);

    });

  // FILTER ORDER STATUS
  if (e.target.id.includes('order-status')) {
    console.warn("closed")
    if (document.querySelector('#order-status').value === 'open'){
  console.warn("open")
      getOpen(user.uid).then((orders) => showOrders(orders))
    }
  if (document.querySelector ('#order-status').value === 'closed'){
      getClosed(user.uid).then((orders) => showOrders(orders))
}
  }
  });
}



export default domEvents;
