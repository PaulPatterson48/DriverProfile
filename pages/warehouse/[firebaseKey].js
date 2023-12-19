/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewSingleWarehouse } from '../../api/mergedData';
import DriverCard from '../../components/DriverCard';
import WarehouseCard from '../../components/WarehouseCard';

export default function ViewWarehouse() {
  const [warehouses, setWarehouses] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getWarehouseDetails = () => {
    viewSingleWarehouse(firebaseKey).then(setWarehouses);
    console.warn(getWarehouseDetails);
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [firebaseKey]);

  return (
    <section className="driverProfile">

      {warehouses.drivers?.length === 0 ? (
        <div className="d-flex flex-wrap">
          <WarehouseCard
            warehouseObj={warehouses}
            onUpdate={getWarehouseDetails}
          />

        </div>
      ) : (
        <div className="d-flex flex-wrap">
          <div>
            <h2>Welcome To: {warehouses.warehouseName} </h2>
            <h3>Number: {warehouses?.warehouseNumber} </h3>
            <div className="d-flex flex-wrap">
              {warehouses.drivers?.map((driver) => (
                <DriverCard
                  driverObj={driver}
                  onUpdate={getWarehouseDetails}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </section>

  );
}
