/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewDriverDetails } from '../../api/mergedData';

export default function ViewDrivers() {
  const [driverDetails, setDriverDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewDriverDetails(firebaseKey).then(setDriverDetails);
  }, [firebaseKey]);

  return (
    <section className="driverProfile">
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={driverDetails.image} alt={driverDetails.driver_name} style={{ width: '300px' }} />
        </div>
        <div>
          <h5> {driverDetails.driver_name || ''}
            <p>Phone: {driverDetails.phoneNumber || ''}</p>
            <p>Vehicle: {driverDetails.vehicle_type || ''}</p>
            <p>Warehouse: {driverDetails.warehouseObject?.warehouseName || ''}</p>
            <p>LoadOutDoor: {driverDetails.warehouseObject?.loadOutDoor || ''}</p>
          </h5>
        </div>
      </div>
    </section>

  );
}
