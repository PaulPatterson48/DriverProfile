/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewWarehouseDetails } from '../../api/mergedData';
import WarehouseCard from '../../components/WarehouseCard';

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
    <div>{warehouseDetails.drivers?.map((warehouse) => (
      <WarehouseCard warehouseObj={warehouse.firebaseKey} onUpdate={getWarehouseDetails} />
    ))}

    </div>
  );
}
