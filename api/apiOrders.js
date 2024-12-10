/* eslint-disable */
import client from "../utils/client";

const endpoint = client.databaseURL
// GET Orders 
const getOrders = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'applications/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// Create Order
const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Delete Order
const deleteOrder = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Edit Order  /////////MIGHT HAVE ISSUES 
const editOrder = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export {
    getOrders,
    createOrder,
    deleteOrder,
    editOrder,
}
