/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;

// Get items by FirebaseKey of a specific order
const getItem = (orderFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Items.json?orderBy="orderFirebaseKey"&equalTo="${orderFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

// Delete item 
const deleteItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Items/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getItem,
  deleteItem,
}
