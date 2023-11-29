import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getWarehouse = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/warehouse.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const createWarehouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/warehouse.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleWarehouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/warehouse/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleWarehouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/warehouse/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateWarehouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/warehouse/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getDriverWarehouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver.json?orderBy="warehouseId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

export {
  getWarehouse,
  createWarehouse,
  getSingleWarehouse,
  deleteSingleWarehouse,
  updateWarehouse,
  getDriverWarehouse,
};
