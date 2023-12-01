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
    if (window.confirm(`Delete ${driverObj.driver_name}?`)) {
      deleteDriver(driverObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px ' }}>
      <Card.Img variant="top" src={driverObj?.image} alt={driverObj?.driver_name} style={{ height: '400px ' }} />
      <Card.Body>
        <Card.Title>{driverObj?.driver_name}</Card.Title>
        <p className="card-text bold row justify-content-left">Route: {<span>Route<br /></span> && driverObj?.route}</p>
        <p className="card-text bold row justify-content-left">3PL Company: {<span>3PlCompany</span> && driverObj?.ThreePlCompany}</p>
        <p className="card-text bold row justify-content-left">Driver Number: {driverObj?.phoneNumber}</p>
        <Link href={`/driver/${driverObj?.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`driver/edit/${driverObj?.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisDriver} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

DriverCard.propTypes = {
  driverObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    driver_name: PropTypes.string,
    image: PropTypes.string,
    phoneNumber: PropTypes.string,
    ThreePlCompany: PropTypes.string,
    route: PropTypes.string,
    vehicle_type: PropTypes.string,

  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DriverCard;
