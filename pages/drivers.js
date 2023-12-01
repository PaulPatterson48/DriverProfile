/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getDrivers } from '../api/driverData';
import { useAuth } from '../utils/context/authContext';
import DriverCard from '../components/DriverCard';

function ShowDrivers() {
  const [drivers, setDrivers] = useState([]);

  const { user } = useAuth();

  const getAllTheDrivers = () => {
    getDrivers(user.uid).then(setDrivers);
  };

  useEffect(() => {
    getAllTheDrivers();
  }, []);

  return (
    <section className="driverProfile">
      <div className="d-flex flex-wrap">
        <div className="text-center my-4">
          <Link href="/driver/new" passHref>
            <Button>Add A Driver</Button>
          </Link>
          <div
            className="d-flex flex-wrap"
          >
            {drivers?.map((driver) => (
              <DriverCard key={driver.firebaseKey} driverObj={driver} onUpdate={getAllTheDrivers} />
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}

export default ShowDrivers;
