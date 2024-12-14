/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;

// get item 
const getMenuItems = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/menuItems.json`, {
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
const getSingleItem = (menufirebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/menuItems/${menufirebaseKey}.json`, {
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
    fetch(`${endpoint}/menuItems/${firebaseKey}.json`, {
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
      fetch(`${endpoint}/menuItems.json`, {
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
    fetch(`${endpoint}/menuItems/${payload.firebaseKey}.json`, {
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

export default getMenuItems; 