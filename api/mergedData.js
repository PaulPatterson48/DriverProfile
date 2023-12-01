import { getDriverWarehouse, getSingleWarehouse, deleteSingleWarehouse } from './warehouseData';
import { getSingleDriver, deleteDriver } from './driverData';

const viewDriverDetails = (driverFirebaseKey) => new Promise((resolve, reject) => {
  getSingleDriver(driverFirebaseKey).then((driverObject) => {
    getSingleWarehouse(driverObject.warehouseId)
      .then((warehouseObject) => {
        resolve({ ...driverObject, warehouseObject });
      });
  }).catch((error) => reject(error));
});
const viewWarehouseDetails = async (warehouseFirebaseKey) => {
  const warehouse = await getSingleWarehouse(warehouseFirebaseKey);
  const drivers = await getDriverWarehouse(warehouse.firebaseKey);
  return { ...warehouse, drivers };
};

const deleteWarehouseDrivers = (firebaseKey) => new Promise((resolve, reject) => {
  getDriverWarehouse(firebaseKey).then((warehouseDriverArray) => {
    const deleteDriverPromises = warehouseDriverArray.map((driver) => deleteDriver(driver.firebaseKey));

    Promise.all(deleteDriverPromises).then(() => {
      deleteSingleWarehouse(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  viewDriverDetails,
  viewWarehouseDetails,
  deleteWarehouseDrivers,
};
