/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewWarehouseDetails } from '../../api/mergedData';
import { getSingleWarehouse } from '../../api/warehouseData';
import DriverCard from '../../components/DriverCard';
import WarehouseCard from '../../components/WarehouseCard';

export default function ViewWarehouse() {
  const [warehouses, setWarehouses] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getWarehouseDetails = () => {
    viewWarehouseDetails(firebaseKey).then(setWarehouses);
    console.warn(getWarehouseDetails);
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [firebaseKey]);

  return (
    <section className="driverProfile">
      <div className="d-flex flex-wrap"> {warehouses.drivers?.map((warehouse) => (
        <DriverCard
          driverObj={warehouse}
          onUpdate={getWarehouseDetails}
        />

      ))}
        {!warehouses.drivers?.length && (
          <div className="d-flex flex-wrap">
            <WarehouseCard
              warehouseObj={warehouses.firebaseKey}
              onUpdate={getSingleWarehouse}
            />

          </div>
        )}
      </div>

    </section>

  );
}
