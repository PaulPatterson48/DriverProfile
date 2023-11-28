import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWarehouse, updateWarehouse } from '../../api/warehouseData';

const initialState = {
  warehouseName: '',
  warehouseNumber: '',
  loadOutdoor: '',
  vehicleNumber: '',
};

function WarehouseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    if (obj.firebaseKey) {
      updateWarehouse(formInput).then(() => router.push(`/warehouse/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWarehouse(payload).then(({ name }) => {
        const patchPayload = { firebasekey: name };
        updateWarehouse(patchPayload).then(() => {
          router.push('/warehouse');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Warehouse</h2>

      <FloatingLabel controlId="floatingInput1" label="warehoueName" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Warehouse Name"
          name="warehouseName"
          value={formInput.warehouseName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="warehouseNumber" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Warehouse Number"
          name="warehouseNumber"
          value={formInput.warehoueNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="loadOutdoor" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Load Out Door"
          name="loadOutdoor"
          value={formInput.loadOutdoor}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="vehicleNumber" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Vehicle Number"
          name="vehicleNumber"
          value={formInput.vehicleNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Warehouse</Button>

    </Form>
  );
}

WarehouseForm.propTypes = {
  obj: PropTypes.shape({
    warehouseName: PropTypes.string,
    warehouseNumber: PropTypes.number,
    loadOutdoor: PropTypes.number,
    vehicleNumber: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

WarehouseForm.defaultProps = {
  obj: initialState,
};

export default WarehouseForm;
