import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;
// testing issue with authContext.js removed uid from code
const getDrivers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// substituded firebaseKey for id
const deleteDriver = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createDriver = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleDriver = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateDriver = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'applicaiton/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getDriverByWarehouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/driver.json?orderBy="warehouseId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const viewDriversDetails = (driverId) => new Promise((resolve, reject) => {
  getSingleDriver(driverId)
    .then((driverObject) => {
      resolve({ ...driverObject });
    }).catch((error) => reject(error));
});

export {
  getDrivers,
  deleteDriver,
  getSingleDriver,
  createDriver,
  updateDriver,
  viewDriversDetails,
  getDriverByWarehouse,
};
