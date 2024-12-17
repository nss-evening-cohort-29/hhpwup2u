/* eslint-disable */
import client from "../utils/client";
import { getItem } from "./apiItems";
import showOrders from "../Dom/ordersPage";

const endpoint = client.databaseURL

// GET ALL Orders ADMIN ONLY
const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Orders.json`, {
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


// Delete order and items attached to that order
const deleteOrderItemsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getItem(firebaseKey).then((orderItemsArray) => {
    const deleteItemPromises = orderItemsArray.map((item) => deleteItemPromises(item.firebaseKey));

    Promise.all(deleteItemPromises).then(() => {
      deleteOrder(firebaseKey).then(resolve);
    });
  }).catch(reject);
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

  // GET SINGLE ORDER
  const getSingleOrder = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

  // FILTER ORDER STATUS
  const getOpen = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
          const open = Object.values(data).filter((statObj) => statObj.status === 'open');
      resolve(open);
      })
      .catch(reject);
  });

  const getClosed = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Orders.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const closed = Object.values(data).filter((statObj) => statObj.status === 'closed');
        resolve(closed);
      })
      .catch(reject);
  });

    // SEARCH ORDER BY NAME, PHONE, & ORDER STATUS

    const searchOrders = (user) => {
      const searchValue = document.querySelector('#search').value.toLowerCase();
      getOrders(user.uid).then((orders) => {
        const orderValue = orders.filter((order) =>
          order.customerPhone.toLowerCase().includes(searchValue) ||
          order.orderName.toLowerCase().includes(searchValue)
        );
          showOrders(orderValue);
      });
    };

export {
    getOrders,
    createOrder,
    deleteOrder,
    editOrder,
    getSingleOrder,
    getOpen,
    getClosed,
    getAllOrders,
    deleteOrderItemsRelationship,
    searchOrders
}
