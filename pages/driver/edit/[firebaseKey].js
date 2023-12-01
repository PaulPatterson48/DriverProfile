import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDriver } from '../../../api/driverData';
import DriverForm from '../../../components/forms/DriverForm';

export default function EditDriver() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  // Make a call to the API to get the driver data
  useEffect(() => {
    getSingleDriver(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // Pass driverObject to the form
  return (<section className="driverProfile"><DriverForm driverObj={editItem} /></section>);
}
