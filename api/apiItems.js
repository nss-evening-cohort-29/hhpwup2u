/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;


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
  
export {
  getItem, createItem };
