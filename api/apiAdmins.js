/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;

// GET ADMINS
const getAdmins = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Admins.json`, {
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
  
export default getAdmins;