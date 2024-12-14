/* eslint-disable */
import { createOrder, editOrder, getOrders, getSingleOrder } from '../api/apiOrders';
import showOrders from '../Dom/ordersPage';
import { editItem, getItem, createItem, } from '../api/apiItems';
import showItems from '../Dom/orderDetail';
import clearDom from '../utils/clearDom';
import { createRevenue, editRevenue } from '../api/apiRevenue';
import renderToDOM from '../utils/renderToDom';

const formEvents = (user) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // create order
    if (e.target.id.includes('submit-order')) {
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

        editOrder(patchPayload).then(() => {
          getOrders(user.uid).then(showOrders);
        });
      });
    } 
    
    // edit order
    else if (e.target.id.includes('update-order')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        orderName: document.querySelector('#name').value,
        customerPhone: document.querySelector('#custPhone').value,
        customerEmail: document.querySelector('#email').value,
        orderType: document.querySelector('#order-type').value,
        firebaseKey,
      };

      editOrder(payload).then(() => {
        getOrders(user.uid).then(showOrders);
      });
    } 

    // create item
    else if (e.target.id.includes('submit-item')) {
      const [, firebaseKeyFromOrders] = e.target.id.split('--');
      const payload = {
        itemName: document.querySelector('#item-name').value,
        itemPrice: document.querySelector('#item-price').value,
        orderFirebaseKey: firebaseKeyFromOrders,
        uid: user.uid,
      };

      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        editItem(patchPayload).then(() => {
          getItem(firebaseKeyFromOrders).then((item) => showItems(item, firebaseKeyFromOrders));
        });
      });
    }

    // edit item
    else if (e.target.id.includes('update-item')) {
      const [, firebaseKey, orderFirebaseKey] = e.target.id.split('--');
      const payload = {
        itemName: document.querySelector('#item-name').value,
        itemPrice: document.querySelector('#item-price').value,
        orderFirebaseKey,
        firebaseKey,
      }
      editItem(payload).then(() => {
        getItem(orderFirebaseKey).then((item) => showItems(item));
      });
    }
      
    // close an order TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    else if (e.target.id.includes('closing-order-btn')) {
      const [, firebaseKey, totalPrice] = e.target.id.split('__');

      const payloadClose = {
        status: "close", 
        firebaseKey,
      }

      console.log (payloadClose)
      editOrder(payloadClose);

      getSingleOrder(firebaseKey).then((order) => {

        const payload = {
          orderDate: order.orderDate,
          orderName: order.orderName,
          orderType: order.orderType,
          paymentType: document.querySelector('#paymentType').value,
          tipAmount: document.querySelector('#tip-amount').value,
          totalOrderAmount: totalPrice,
          timeClosed: Date.now()
        }

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



    }) 
    }


  });
};

export default formEvents;
