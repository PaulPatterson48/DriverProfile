/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleWarehouse } from '../../../api/warehouseData';
import WarehouseForm from '../../../components/forms/WarehouseForm';

export default function EditWarehouse() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleWarehouse(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <WarehouseForm warehouseObj={editItem} />

  );
}
