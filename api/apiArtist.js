/* eslint-disable */
import client from '../utils/client';

const endpoint = client.databaseURL;

// get Artist 
const getArtistItems = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/artistBoard.json`, {
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

// get single Artist
const getSingleArtistItem = (artistfirebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/artistBoard/${artistfirebaseKey}.json`, {
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

// Delete Artist 
const deleteArtistItem = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/artistBoard/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// create Artist
const createArtistItem = (payload) => new Promise ((resolve,
    reject) => {
      fetch(`${endpoint}/artistBoard.json`, {
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

// edit Artist
const editArtistItem = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/artistBoard/${payload.firebaseKey}.json`, {
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

  export { getArtistItems,getSingleArtistItem, deleteArtistItem, createArtistItem, editArtistItem };
