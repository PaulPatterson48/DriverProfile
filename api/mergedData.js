// Importing Functions: brings special tools(functions) stored in other files.
import { getDriverWarehouse, getSingleWarehouse, deleteSingleWarehouse } from './warehouseData';
import { getSingleDriver, deleteDriver } from './driverData';

// This function helps us see details about a driver. It takes special code (a key) for a driver, finds that driver's information, then looks for the warehouse they belong to. It puts all this information together and gives it back.
const viewDriverDetails = (driverFirebaseKey) => new Promise((resolve, reject) => {
  getSingleDriver(driverFirebaseKey).then((driverObject) => {
    getSingleWarehouse(driverObject.warehouseId)
      .then((warehouseObject) => {
        resolve({ ...driverObject, warehouseObject });
      });
  }).catch((error) => reject(error));
});

// This function helps us see details about the warehouse. it takes a special code for a warehouse, finds that warehouse's information and also looks for all the drivers in the warehouse. Then it puts all this information together and gives it back.
const viewWarehouseDetails = (warehouseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleDriver(warehouseFirebaseKey), getDriverWarehouse(warehouseFirebaseKey)])
    .then(([warehouseObject, warehouseDriverArray]) => {
      console.warn(warehouseDriverArray);
      resolve({ ...warehouseObject, drivers: warehouseDriverArray });
    }).catch((error) => reject(error));
});

const viewSingleWarehouse = async (firebaseKey) => {
  const warehouse = await getSingleWarehouse(firebaseKey);
  const drivers = await getDriverWarehouse(warehouse.firebaseKey);
  return { ...warehouse, drivers };
};

// This function is for when we want to remove a whole warehouse and all it's drivers. It first finds all the drivers in that warehouse, then goes through each driver and removes them. After that, it deletes the warehouse itself. It's like cleaning up everythnig related to that warehouse.
const deleteWarehouseDrivers = (firebaseKey) => new Promise((resolve, reject) => {
  getDriverWarehouse(firebaseKey).then((warehouseDriverArray) => {
    console.warn(`The value of driver warehouse is ${warehouseDriverArray}`);
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
  viewSingleWarehouse,
};
