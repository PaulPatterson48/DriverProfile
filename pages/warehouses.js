/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getWarehouse } from '../api/warehouseData';
import { useAuth } from '../utils/context/authContext';
import WarehouseCard from '../components/WarehouseCard';

function ShowWarehouse() {
  const [warehouses, setWarehouses] = useState([]);

  const { user } = useAuth();

  const getAllTheWarehouses = () => {
    getWarehouse(user.uid).then(setWarehouses);
  };

  useEffect(() => {
    getAllTheWarehouses();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      <div className="text-center my-4">
        <Link href="/warehouse/new" passHref>
          <Button>Add A Warehouse</Button>
        </Link>
        {warehouses?.map((warehouse) => (
          <WarehouseCard
            key={warehouse.firebaseKey}
            warehouseObj={warehouse}
            onUpdate={getAllTheWarehouses}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowWarehouse;
