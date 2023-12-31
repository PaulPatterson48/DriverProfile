import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getWarehouse, createWarehouse, updateWarehouse } from '../../api/warehouseData';

const initialState = {
  warehouseName: '',
  warehouseNumber: '',
  loadOutDoor: '',
  vehicleNumber: '',
};

function WarehouseForm({ warehouseObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getWarehouse(user.uid).then(setFormInput);
    if (warehouseObj?.firebaseKey) setFormInput(warehouseObj);
  }, [warehouseObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (warehouseObj.firebaseKey) {
      updateWarehouse(formInput).then(() => router.push(`/warehouse/${warehouseObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWarehouse(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateWarehouse(patchPayload).then(() => {
          router.push('/warehouses');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{warehouseObj?.firebaseKey ? 'Update' : 'Create'} Warehouse</h2>

      <FloatingLabel controlId="floatingInput1" label="warehoueName" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          name="warehouseName"
          value={formInput.warehouseName}
          onChange={handleChange}

        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="warehouseNumber" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Number"
          name="warehouseNumber"
          value={formInput.warehouseNumber}
          onChange={handleChange}

        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="loadOutdoor" className="mb-3">
        <Form.Select
          aria-label=""
          name="loadOutDoor"
          value={formInput.loadOutDoor}
          onChange={handleChange}
          required
        >
          <option>Here is your Load Out Door</option>
          <option value="Door 01">Door 01</option>
          <option value="Door 02">Door 02</option>
          <option value="Door 03">Door 03</option>
          <option value="Door 04">Door 04</option>
          <option value="Door 05">Door 05</option>
          <option value="Door 06">Door 06</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="license plate" className="mb-3">
        <Form.Control
          type="text"
          placeholder="license plate"
          name="vehicleNumber"
          value={formInput.vehicleNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{warehouseObj?.firebaseKey ? 'Update' : 'Create'} Warehouse</Button>

    </Form>
  );
}

WarehouseForm.propTypes = {
  warehouseObj: PropTypes.shape({
    warehouseName: PropTypes.string,
    warehouseNumber: PropTypes.string,
    loadOutDoor: PropTypes.string,
    vehicleNumber: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

WarehouseForm.defaultProps = {
  warehouseObj: initialState,
};

export default WarehouseForm;
