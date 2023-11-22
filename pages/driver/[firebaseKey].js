/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDriver } from '../../api/driverData';

export default function ViewDrivers() {
  const [driverDetails, setDriverDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleDriver(id).then(setDriverDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flec flex-wrap">
      <div className="d-flex flex-column">
        <img src={driverDetails.image} alt={driverDetails.driver_name} style={{ width: '300px' }} />
      </div>

      <div>
        <h5> {driverDetails.driver_name || ''} <p>{driverDetails.vehicle_type || ''}</p></h5>
      </div>
    </div>
  );
}
