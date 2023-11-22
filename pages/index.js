/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { getDrivers } from '../api/driverData';
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import DriverCard from '../components/DriverCard';

function Home() {
  const [drivers, setDrivers] = useState([]);
  const { user } = useAuth();

  const getAllTheDrivers = () => {
    getDrivers(user.uid).then(setDrivers);
  };

  useEffect(() => {
    getAllTheDrivers();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>Warehouse</h1>
      <Link href="driver/new" passHref>
        <Button>Add A Driver</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {drivers?.map((driver) => (
          <DriverCard key={driver.id} driverObj={driver} onUpdate={getAllTheDrivers} />
        ))}
      </div>
    </div>
  );

  // <h1>Hello {user.displayName}! </h1>
  // </div>
  // );
}

export default Home;
