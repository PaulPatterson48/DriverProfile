import { getDriverWarehouse, getSingleWarehouse, deleteSingleWarehouse } from './warehouseData';
import { getSingleDriver, deleteDriver } from './driverData';

const viewDriverDetails = (driverFirebaseKey) => new Promise((resolve, reject) => {
  getSingleDriver(driverFirebaseKey)
    .then((driverObject) => {
      getSingleWarehouse(driverObject.warehouseId)
        .then((warehouseObject) => {
          resolve({ warehouseObject, ...driverObject });
        });
    }).catch((error) => reject(error));
});

const viewWarehouseDetails = (warehouseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleWarehouse(warehouseFirebaseKey), getDriverWarehouse(warehouseFirebaseKey)])
    .then(([warehouseObject, warehouseDriverArray]) => {
      resolve({ ...warehouseObject, driver: warehouseDriverArray });
    }).catch((error) => reject(error));
});

const deleteWarehouseDrivers = (firebaseKey) => new Promise((resolve, reject) => {
  getDriverWarehouse(firebaseKey).then((warehouseDriverArray) => {
    const deleteDriverPromises = warehouseDriverArray.map((driver) => deleteDriver(driver.firebaseKey));

    Promise.all(deleteDriverPromises).then(() => {
      deleteSingleWarehouse(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
// Get Drivers not related to a Warehouse
// const getDriversNotInTheWarehouse = (uid) => {
// const allDrivers = await getDriver(uid);

// const driverPromise = await
// const drivers = await Promise.all(driverPromise)

// }

export {
  viewDriverDetails,
  viewWarehouseDetails,
  deleteWarehouseDrivers,
};
