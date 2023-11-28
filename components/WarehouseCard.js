import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleWarehouse } from '../api/warehouseData';

function WarehouseCard({ warehouseObj, onUpdate }) {
  const deleteThisWarehouse = () => {
    if (window.confirm(`Delete ${warehouseObj.warehouseName}?`)) {
      deleteSingleWarehouse(warehouseObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{warehouseObj.warehouseName}</Card.Title>
        <Link href={`/warehouse/edit/${warehouseObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/warehouse/edit/${warehouseObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisWarehouse} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>

  );
}

WarehouseCard.propTypes = {
  warehouseObj: PropTypes.shape({
    warehouseName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WarehouseCard;
