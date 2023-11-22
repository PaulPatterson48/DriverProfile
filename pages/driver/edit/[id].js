import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDriver } from '../../../api/driverData';
import DriverForm from '../../../components/forms/DriverForm';

export default function EditDriver() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleDriver(id).then(setEditItem);
  }, [id]);

  return (<DriverForm driverObj={editItem} />);
}
