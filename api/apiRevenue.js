/* eslint-disable */
import client from "../utils/client";
const endpoint = client.databaseURL
// GET REVENUE
const getRevenue = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/revenue.json`, {
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

  export default getRevenue;
