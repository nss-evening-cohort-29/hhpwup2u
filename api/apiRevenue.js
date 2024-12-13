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
  
  // Create REVENUE

  const createRevenue = (payload) => new Promise ((resolve,
    reject) => {
      fetch(`${endpoint}/revenue.json`, {
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

    //Edit Revenue 

    const editRevenue = (payload) => new Promise((resolve, reject) => {
      fetch(`${endpoint}/revenue/${payload.firebaseKey}.json`, {
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
    getRevenue,
    createRevenue,
    editRevenue,
  };
