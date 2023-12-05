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
  const router = useRouter(); // It enables the creation of single-page web or mobile apps that allow navigating without refreshing the page.
  const { user } = useAuth(); // returns all of the user data (deconstructs) only give me the user in useAuth() function that takes no parameters.

  // The program gets information about the user and warehouses when the page loads
  // driverObj is a dependant
  // useEffect tells React that your component needs to do something after render
  useEffect(() => {
    getWarehouse(user.uid).then(setWarehouses);
    if (driverObj.firebaseKey) setFormInput(driverObj); // Update the form PATCH
  }, [driverObj, user]);

  // When someone types or selects something in the form, this function is called to update the informatin in the computers's memory
  // events (e) are things that happen in the system you are programming, which the system tells youy ablout so your code can react to them.
  // previous state can use the previous value of the state while using the set state method.
  // handleChange handle changes that the users made in the input is called when the user toggles a task or presses save
  // the spread operator provides a concise way to pass props, copy objects, and manage the state. Allow you to expand arrays and objects into multiple elements.
  const handleChange = (e) => { // event of the input
    const { name, value } = e.target;
    setFormInput((prevState) => ({ // setFormInput is a function provided by the useState hook to update the state of the formInput
      ...prevState, // prevState spreads the properties of the previous state object, creating a shallow copy
      [name]: value, // name value dynamically updates the property specified by the name variable with tthe new value.
    }));
  };

  // When someone clicks the "Submit" button, this function is called. It sends the drivers's information to be saved or updated
  // preventDefault default browser action for the event
  // handle submit function will receive the form data if the validation is successful. Also a wrapper for react-hook-form to manage your data inputs, validation, errors
  // patchPayload updates the information and gives it the firebaseKey
  // preventDefault will cancel the default event behavior (browser refresh) while allowing us to execute any code we write inside handleSubmit
  // router.push navigates the user to the page specified
  const handleSubmit = (e) => {
    e.preventDefault();
    if (driverObj.firebaseKey) {
      updateDriver(formInput).then(() => router.push(`/driver/${driverObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid }; // take the input add the user uid
      createDriver(payload).then(({ name }) => { // name is the firebaseKey
        const patchPayload = { firebaseKey: name };
        updateDriver(patchPayload).then(() => {
          router.push('/drivers');
        });
      });
    }
  };

  // This part builds the actual form using the information and tools imported earlier
  // onSubmit is an event handler attached to the form submission event
  // Form Control is a utility that lets you associate a form input with auxiliary components, such as labels, error indicators, or help text.
  // Floating Label a label tag which floats just above the input field when it is being focused or already has content inside
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
          placeholder="Name"
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
          placeholder="Phone Number"
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
            // .map method in react is a type of data structure or data collection that is used to store the data in the form of key and value pairs. Each pair has a unique key in a map
            // Form.Select element is most often used in a form to collect user input
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
// internal mechanism for adding type checking to component props (type checking)

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
