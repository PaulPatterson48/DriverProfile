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
  };

  const viewSingleWarehouse = () => {
    getSingleWarehouse(firebaseKey).then(setWarehouses);
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [firebaseKey]);

  return (
    <section className="driverProfile">
      <div className="d-flex flex-wrap"> {warehouses.drivers?.map((warehouse) => (
        <DriverCard
          key={warehouse.firebaseKey}
          driverObj={warehouse}
          onUpdate={getWarehouseDetails}
        />

      ))}
        {!warehouses.drivers?.length === (
          <div className="d-flex flex-wrap">
            <WarehouseCard warehouseObj={warehouses} onUpdate={viewSingleWarehouse} />
          </div>
        )}
      </div>,

    </section>

  );
}
