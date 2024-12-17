/* eslint-disable */

import { getOrders, deleteOrder, getSingleOrder, getAllOrders, searchOrders, getClosed } from "../api/apiOrders";

import showOrders from "../Dom/ordersPage";
import showItems from "../Dom/orderDetail";
import { getItem, getSingleItem } from "../api/apiItems";
import { deleteItem, createItem, editItem } from "../api/apiItems";
import createOrderForm from "../Form/createOrderForm";
import createItemForm from "../Form/createItemForm";
import closeOrderForm from "../Form/closeOrderForm";
import showOpenItemForMenu from "../Dom/menuOrderPage";
import { getSingleMenuItem, getMenuItems, deleteMenuItem } from "../api/apiMenu";
import showMenuItems from "../Dom/menu";
import createMenuItemForm from "../Form/createMenuItemForm";
import { deleteArtistItem, getArtistItems } from "../api/apiArtist";
import BookArtistForm from "../Form/createArtistForm";
import homeBuilder from "../Dom/homeScreen";

const domEvents = (user, admin) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    e.preventDefault();

    //Searching ORders
    if (e.target.id.includes('SearchBox')) {
      {searchOrders(user, admin)}
    }

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
        if (admin === 2) {
          const [, firebaseKey] = e.target.id.split('__');
          deleteOrder(firebaseKey).then(() => {
            getAllOrders().then(showOrders);
          });
        }
        else {
          const [, firebaseKey] = e.target.id.split('__');
          deleteOrder(firebaseKey).then(() => {
            getOrders(user.uid).then(showOrders);
          });
        }
      }
    }

    // GO to Menu item from order page
    if (e.target.id.includes('Go-to-Menu-from-item-btn')) {
      if (admin === 2){
        getMenuItems(user.uid).then((item) => showMenuItems(item, admin));
      }
      else {
        getMenuItems(user.uid).then((item) => showMenuItems(item));
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

  // FILTER ORDER STATUS
  if (e.target.id.includes('order-status')) {

    if (admin === 2) {
      if (document.querySelector('#order-status').value === 'open'){
        getAllOrders().then((orders) => {
          let closedArray = []
        orders.forEach(element => {
        if (element.status === 'open') {
          closedArray.push(element)
        }
          })
          console.log(closedArray)
          showOrders(closedArray)
        }
        )
      }
      if (document.querySelector ('#order-status').value === 'closed'){
        getAllOrders().then((orders) => {
          let closedArray = []
        orders.forEach(element => {
        if (element.status === 'close') {
          closedArray.push(element)
        }
          })
          console.log(closedArray)
          showOrders(closedArray)
        }
        )
      }
    }
    else {
      if (document.querySelector('#order-status').value === 'open'){
        getClosed(user.uid).then((orders) => {
          let closedArray = []
        orders.forEach(element => {
        if (element.status === 'open') {
          closedArray.push(element)
        }
          })
          console.log(closedArray)
          showOrders(closedArray)
        }
        )
      }
      if (document.querySelector ('#order-status').value === 'closed'){
        getClosed(user.uid).then((orders) => {
          let closedArray = []
        orders.forEach(element => {
        if (element.status === 'close') {
          closedArray.push(element)
        }
          })
          console.log(closedArray)
          showOrders(closedArray)
        }
        )
      }
    } 

  }
    if (e.target.id.includes('Order-menu-btn')) {
      const [, MenuItemKey] = e.target.id.split('--');
        if (admin === 2) {
          getOpenOrders().then((order) => showOpenItemForMenu(order,MenuItemKey))
        }
        else {
          getOpenOrders().then((orders) => { 
            let UidItems = [];
            orders.forEach(order => {
              if (order.uid === user.uid) {
                UidItems.push(order);
              }
            });

            showOpenItemForMenu(UidItems,MenuItemKey);
        });
        }


    }

    // ADD MENU ITEM
    if (e.target.id.includes('add-menu-btn')) {
      createMenuItemForm({});
    }

    //edit menu item
    if (e.target.id.includes('edit-menu-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleMenuItem(firebaseKey).then((menuObj) => createMenuItemForm(menuObj))
    }
    
    // DELETE MENU ITEM FORM
    if (e.target.id.includes('delete-menu-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      deleteMenuItem(firebaseKey).then(() => {
        getMenuItems().then((item) => showMenuItems(item, admin));
      })
    }

    // FOR ADDING ITEM FROM MENU ORDER
    if (e.target.id.includes('from-menu-add-order-btn')) {

      const [, firebaseKeyFromOrders, firebaseKeyForMenuItem] = e.target.id.split('__');

      getSingleMenuItem(firebaseKeyForMenuItem).then((item) => {
        const payload = {
          itemName: item.menuItemName,
          itemPrice: item.menuItemPrice,
          orderFirebaseKey: firebaseKeyFromOrders,
        };

        createItem(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          editItem(patchPayload).then(() =>
            getItem(firebaseKeyFromOrders).then((item) =>
              showItems(item, firebaseKeyFromOrders)
            )
          );
        });

      })
    }

    //Delete an artist
    if (e.target.id.includes('delete-new-artist')) {
      const [, firebaseKey] = e.target.id.split('--');
      deleteArtistItem(firebaseKey).then(() => 
        getArtistItems().then ((artist) => homeBuilder(user, artist, admin))
    )

    }

    if (e.target.id.includes('book-new-artist')) {
      BookArtistForm();
    }


  });
}



export default domEvents;
