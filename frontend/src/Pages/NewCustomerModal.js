import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { customerCreate,handleChange, clearValues } from '../Slice/customerSlice';
import { useDispatch, useSelector } from "react-redux"; 
import { toast } from "react-toastify"; 
export const NewCustomerModal = ({ show, handleClose, handleNewCustomerAdded }) => {

  const { user } = useSelector((store) => store.auth);
  const { customer,phoneNumber} = useSelector((store) => store.customer);
  const dispatch = useDispatch();  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customerCreate({customer,phoneNumber,userId:user.id}))
    .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Successfully Added New Customer!");
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to Add New Customer. Please Try Again!");
      });
       dispatch(clearValues());

    handleClose(); // Close the modal after adding the new customer
  };

  // Handle input change
  const onChange = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newCustomerName">
            <Form.Label className='modalLabel'>Customer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter customer name"
              name='customer'
              value={customer}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="newCustomerPhoneNumber">
            <Form.Label className='modalLabel'>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name='phoneNumber'
              value={phoneNumber}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Customer
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
