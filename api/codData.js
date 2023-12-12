import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCodOrders = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cod.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicatoin/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCod = (firebaseKey) => Promise((resolve, reject) => {
  fetch(`${endpoint}/cod/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'applicatoin/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createCod = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cod.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getCodforDrivers = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver/${firebaseKey}/collectCod`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addCodToDrivers = (uid, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver/${uid}/cod`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => {
    let data;
    if (res.ok) {
      data = await res.json();
      resolve(data);
    }
  }).catch(reject);
});

export {
  getCodOrders,
  deleteCod,
  createCod,
  getCodforDrivers,
  addCodToDrivers,
};
