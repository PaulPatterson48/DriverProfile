import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteDriver } from '../api/driverData';

function DriverCard({ driverObj, onUpdate }) {
  // Need to be able to remove the driver and have the view render
  // Pass the function from the parent that gets the Driver
  const deleteThisDriver = () => {
    if (window.confirm(`Delete ${driverObj}.name}?`)) {
      deleteDriver(driverObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px ' }}>
      <Card.Img variant="top" src={driverObj.image} alt={driverObj.driver_name} style={{ height: '400px ' }} />
    </Card>
  );
}

DriverCard.propTypes = {
  driverObj: PropTypes.shape({
    id: PropTypes.string,
    driver_name: PropTypes.string,
    image: PropTypes.string,
    phoneNumber: PropTypes.string,
    route: PropTypes.string,
    vehicle_type: PropTypes.string,
    warehouseId: PropTypes.string,

  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DriverCard;
