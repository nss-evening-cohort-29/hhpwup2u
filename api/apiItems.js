/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;

// get item 
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

// get single item
const getSingleItem = (itemfirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Items/${itemfirebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
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

// create item
const createItem = (payload) => new Promise ((resolve,
  reject) => {
    fetch(`${endpoint}/Items.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => resolve (data))
    .catch(reject);
  });

  // edit item
 const editItem = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Items/${payload.firebaseKey}.json`, {
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
  getItem, createItem, deleteItem, editItem, getSingleItem };
