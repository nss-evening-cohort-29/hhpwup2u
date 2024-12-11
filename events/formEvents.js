/* eslint-disable */
import { createOrder, editOrder, getOrders } from '../api/apiOrders';
import showOrders from '../Dom/ordersPage';

const formEvents = (user) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    console.warn("yay");

    if (e.target.id.includes('submit-order')) {
      const payload = {
        orderName: document.querySelector('#name').value,
        customerPhone: document.querySelector('#custPhone').value,
        customerEmail: document.querySelector('#email').value,
        orderType: document.querySelector('#order-type').value,
        uid: user.uid
      };

      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        editOrder(patchPayload).then(() => {
          getOrders(user.uid).then(showOrders);
        });
      });
    }
    if (e.target.id.includes('update-order')) {
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
  });

  if (e.target.id.includes('submit-item')) {
    const payload = {
      itemName: document.querySelector('#item-price').value,
      itemPrice: document.querySelector('#item-name').value,
      uid: user.uid
    };
    createItem
  }
};
export default formEvents;
