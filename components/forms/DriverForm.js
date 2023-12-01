// These lines bring in different pieces of code telling the computer to use these tools in my program
import React, { useEffect, useState } from 'react'; // This is for my hooks
import { useRouter } from 'next/router'; // This is for my routes
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getWarehouse } from '../../api/warehouseData';
import { createDriver, updateDriver } from '../../api/driverData';

// The inital state is like setting up a blank form with all the different pieces of information about a driver. it's like creating a template for the driver details.
const initialState = {
  image: '',
  driver_name: '',
  phoneNumber: '',
  route: '',
  vehicle_type: '',
  ThreePlCompany: '',
  warehouseId: '',

};
// This function takesa piece of information about a driver (driverObj) as input
// The useState creates a couple of storage spaces in the computer's memory (using 'useState'). One is for the details of the drivers's form ('formInput'), and the other is for a list of warehouses
function DriverForm({ driverObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [warehouses, setWarehouses] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // The program gets information about the user and warehouses when the page loads
  useEffect(() => {
    if (driverObj.firebaseKey) setFormInput(driverObj);
    getWarehouse(user.uid).then(setWarehouses);
  }, [driverObj, user]);

  useEffect(() => {
    getWarehouse(user.uid).then(setWarehouses);
    if (driverObj.firebaseKey) setFormInput(driverObj);
  }, [driverObj, user]);

  // When someone types or selects something in the form, this function is called to update the informatin in the computers's memory
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // When someone clicks the "Submit" button, this function is called. It sends the drivers's information to be saved or updated
  const handleSubmit = (e) => {
    e.preventDefault();
    if (driverObj.firebaseKey) {
      updateDriver(formInput).then(() => router.push(`/driver/${driverObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDriver(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateDriver(patchPayload).then(() => {
          router.push('/drivers');
        });
      });
    }
  };

  // This part builds the actual form using the information and tools imported earlier
  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{driverObj.firebaseKey ? 'Update' : 'Create'} Driver</h1>

      <FloatingLabel controlId="floatingInput1" label="Driver Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Diver Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Driver Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Driver Name"
          name="driver_name"
          value={formInput.driver_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Vehicle Type" className="mb-3">
        <Form.Select
          aria-label="Floating label select example"
          name="vehicle_type"
          value={formInput.vehicle_type}
          onChange={handleChange}
        >
          <option>Choose a vehicle</option>
          <option value="Box Truck">Box Truck</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Warehouse Deliver">Company Truck</option>
          <option value="cargo truck">Cargo Truck</option>

        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Route" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Please Enter Route"
          name="route"
          value={formInput.route}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Third Party Logistics Company" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Company Name"
          name="ThreePlCompany"
          value={formInput.ThreePlCompany}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput7" label="Driver Phone Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Driver Phone Number"
          name="phoneNumber"
          value={formInput.phoneNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Warehouse">
        <Form.Select
          aria-label="Warehouse"
          name="warehouseId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.warehouseId}
          required
        >
          <option value="">Select a Warehouse</option>
          {
            // The key attribute in Raeact is used to optimize the rendering and updating of lists by providing a stable and unique identifier for each element in the list.
            // warehouse.map function is used to loop through the warehouse array within the Form.Select component
              warehouses.map((warehouse) => (
                <option
                  key={warehouse.firebaseKey} // key is used for loop iterates over an array
                  value={warehouse.firebaseKey}
                >
                  {warehouse.warehouseName}
                </option>
              ))
            }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{driverObj.firebaseKey ? 'Update' : 'Create'} Drivers</Button>
    </Form>
  );
}

// This section says what kind of information is expected for a driver object

DriverForm.propTypes = {
  driverObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    driver_name: PropTypes.string,
    vehicle_type: PropTypes.string,
    route: PropTypes.string,
    ThreePlCompany: PropTypes.string,
    warehouseId: PropTypes.string,
    warehouseName: PropTypes.string,
    uid: PropTypes.string,
  }),
};
DriverForm.defaultProps = {
  driverObj: initialState,
};
// This line makes the form available for use in other parts of the program
export default DriverForm;

// This program helps create a form where someone can input information about a driver and it knows how to save or update that information
