/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewWarehouseDetails } from '../../api/mergedData';
import DriverCard from '../../components/DriverCard';

export default function ViewWarehouse() {
  const [warehouseDetails, setWarehouseDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getWarehouseDetails = () => {
    viewWarehouseDetails(firebaseKey).then(setWarehouseDetails);
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [firebaseKey]);

  return (
    <section className="driverProfile">
      <div className="d-flex flex-wrap justify-content-center"> {warehouseDetails.drivers?.map((warehouse) => (
        <DriverCard
          key={warehouse.firebaseKey}
          driverObj={warehouse}
          onUpdate={getWarehouseDetails}
        />
      ))}
      </div>
    </section>

  );
}
