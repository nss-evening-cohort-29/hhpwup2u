/* eslint-disable */
import { createOrder, editOrder, getOrders, getSingleOrder, getAllOrders } from '../api/apiOrders';
import showOrders from '../Dom/ordersPage';
import { editItem, getItem, createItem, } from '../api/apiItems';
import showItems from '../Dom/orderDetail';
import clearDom from '../utils/clearDom';
import { createRevenue, editRevenue } from '../api/apiRevenue';
import renderToDOM from '../utils/renderToDom';
import { getMenuItems, createMenuItem, editMenuItem } from '../api/apiMenu';
import showMenuItems from '../Dom/menu';

const formEvents = (user, admin) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    const targetId = e.target.id;

    // Handle order creation
    if (targetId.includes('submit-order')) {
      if (admin === 2) {
        const payload = {
          orderName: document.querySelector('#name').value,
          customerPhone: document.querySelector('#custPhone').value,
          customerEmail: document.querySelector('#email').value,
          orderType: document.querySelector('#order-type').value,
          status: "open",
          uid: user.uid,
        };

        createOrder(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          editOrder(patchPayload).then(() => getAllOrders().then(showOrders));
        });
      }
      else {
        const payload = {
          orderName: document.querySelector('#name').value,
          customerPhone: document.querySelector('#custPhone').value,
          customerEmail: document.querySelector('#email').value,
          orderType: document.querySelector('#order-type').value,
          status: "open",
          uid: user.uid,
        };

        createOrder(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          editOrder(patchPayload).then(() => getOrders(user.uid).then(showOrders));
        });
      }

    // Handle order update
    } else if (targetId.includes('update-order')) {
      const [, firebaseKey] = targetId.split('--');

      if (admin === 2) {
        const payload = {
          orderName: document.querySelector('#name').value,
          customerPhone: document.querySelector('#custPhone').value,
          customerEmail: document.querySelector('#email').value,
          orderType: document.querySelector('#order-type').value,
          firebaseKey,
        };
  
        editOrder(payload).then(() => getAllOrders().then(showOrders));
      }
      else {
        const payload = {
          orderName: document.querySelector('#name').value,
          customerPhone: document.querySelector('#custPhone').value,
          customerEmail: document.querySelector('#email').value,
          orderType: document.querySelector('#order-type').value,
          firebaseKey,
        };

        editOrder(payload).then(() => getOrders(user.uid).then(showOrders));
      }
    // Handle item creation
    } else if (targetId.includes('submit-item')) {
      const [, firebaseKeyFromOrders] = targetId.split('--');
      const payload = {
        itemName: document.querySelector('#item-name').value,
        itemPrice: document.querySelector('#item-price').value,
        orderFirebaseKey: firebaseKeyFromOrders,
        uid: user.uid,
      };

      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        editItem(patchPayload).then(() =>
          getItem(firebaseKeyFromOrders).then((item) =>
            showItems(item, firebaseKeyFromOrders)
          )
        );
      });

    // Handle item update
    } else if (targetId.includes('update-item')) {
      const [, firebaseKey, orderFirebaseKey] = targetId.split('--');
      const payload = {
        itemName: document.querySelector('#item-name').value,
        itemPrice: document.querySelector('#item-price').value,
        orderFirebaseKey,
        firebaseKey,
      };

      editItem(payload).then(() =>
        getItem(orderFirebaseKey).then((item) => showItems(item))
      );

    // Handle menu item creation
    } else if (targetId.includes('submit-menu-item')) {
      const payload = {
        menuItemName: document.querySelector('#item-name').value,
        menuItemImage: document.querySelector('#item-image').value,
        menuItemPrice: document.querySelector('#item-price').value,
        menuItemSale: document.querySelector('#sale').checked,
      };

      createMenuItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        editMenuItem(patchPayload).then(() =>
          getMenuItems(user.uid).then((item) => showMenuItems(item, admin))
        );
      });
    }
    // handle menu item update
    else if (targetId.includes('update-menu-item')) {
      const [, firebaseKey] = targetId.split('--');
      const payload = {
        menuItemName: document.querySelector('#item-name').value,
        menuItemImage: document.querySelector('#item-image').value,
        menuItemPrice: document.querySelector('#item-price').value,
        menuItemSale: document.querySelector('#sale').checked,
      };

      editMenuItem(payload).then(() => getMenuItems(user.uid).then(showMenuItems));

    // Handle order closure
    }
     else if (targetId.includes('closing-order-btn')) {
      const [, firebaseKey, totalPrice] = targetId.split('__');
      const payloadClose = { status: "close", firebaseKey };

      editOrder(payloadClose).then(() => {
        getSingleOrder(firebaseKey).then((order) => {
          const payload = {
            orderDate: order.orderDate,
            orderName: order.orderName,
            orderType: order.orderType,
            paymentType: document.querySelector('#paymentType').value,
            tipAmount: document.querySelector('#tip-amount').value,
            totalOrderAmount: totalPrice,
            timeClosed: Date.now(),
            orderFirebaseKey: firebaseKey,
            uid: user.uid,
          };

          createRevenue(payload).then(({ name }) => {
            const patchPayload = { firebaseKey: name };
            editRevenue(patchPayload).then(() => {
              clearDom();
              const domString = `
                <div class="card-body">
                  <h5 class="card-title">ORDER CLOSED!!</h5>
                </div>
              `;
              renderToDOM('#form-container', domString);
            });
          });
        });
      });
    }
  });
};

export default formEvents;
