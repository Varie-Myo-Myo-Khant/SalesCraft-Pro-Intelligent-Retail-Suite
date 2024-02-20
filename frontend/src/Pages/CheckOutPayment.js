import React, { useState, useEffect } from "react"; 
import { Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Slice/cartSlice";
import { orderCreate } from "../Slice/orderSlice";
import { deleteLocalStorageCart } from "../Services/localStorage";
import {NewCustomerModal} from './NewCustomerModal';
import { toast } from 'react-toastify';
import { getCustomers } from "../Slice/customerSlice";
import { FaPlusCircle } from "react-icons/fa";

export const CheckOutPayment = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { customers} = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [paymentType, setPaymentType] = useState("Cash");
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
const [customer, setCustomer] = useState("");
  useEffect(() => {
    dispatch(getCustomers()); // Fetch customers
  }, [dispatch]);


  const generateOrderId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 6; // Length of the random part of the order ID
  let result = "ODR-";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      orderNumber: generateOrderId(),
      customer,
      cartItems,
      subTotal,
      totalAmount,
      tax,
      paymentType,
      userId: user.id,
    };

    if (customer !== "") {
      dispatch(orderCreate(newOrder));
      dispatch(clearCart());
      deleteLocalStorageCart();
      navigate("/order");
    } else {
      toast.warning("Please fill in the required fields");
    }
  };

  const handleNewCustomer = () => {
    setShowNewCustomerModal(true);
  };

  const handleCustomerSelect = (e) => {
    setCustomer(e.target.value)
  };

  const handleNewCustomerAdded = (newCustomer) => {
    setShowNewCustomerModal(false);
  };

  return (
    <>
      <Col className="checkoutPayment">
        <h4>Payment</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="customer">
              <select
                className="customer-select"
                onChange={handleCustomerSelect}
              >
                <option value="">Select customer...</option>
                <option value="Walk in Customer">Walk in Customer</option>
                {customers !== undefined && customers.map((customer) => (
                    <option value={customer.customer}>{customer.customer}</option>
                    ))}
              </select>
              <Button onClick={handleNewCustomer}> <FaPlusCircle/>Add New Customer</Button>
            </div>
            <NewCustomerModal
              show={showNewCustomerModal}
              handleClose={() => setShowNewCustomerModal(false)}
              handleNewCustomerAdded={handleNewCustomerAdded}
            />
          </div>
          <div className="states">
            <div>
              <label htmlFor="payment">Payment Method</label>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Cash</Card.Title>
                  <Card.Text>
                    Select this option if you want to pay with cash.
                  </Card.Text>
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    value="cash"
                    checked={paymentType === 'cash'}
                    onChange={(e) => setPaymentType(e.target.value)}
                  />
                  <label htmlFor="cash">Cash</label>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Credit Card</Card.Title>
                  <Card.Text>
                    Select this option if you want to pay with a credit card.
                  </Card.Text>
                  <input
                    type="radio"
                    name="payment"
                    id="credit-card"
                    value="credit card"
                    checked={paymentType === 'credit card'}
                    onChange={(e) => setPaymentType(e.target.value)}
                  />
                  <label htmlFor="credit-card">Credit Card</label>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="cart-total-table">
            <table>
              <tbody>
                <tr>
                  <th>SubTotal:</th>
                  <td>$ {subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Tax: % 8</th>
                  <td>$ {tax.toFixed(2)}</td>
                </tr>
                <tr className="grand-total">
                  <th>TOTAL:</th>
                  <td>
                    <strong>$ {totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="secondary-button">
              <button type="submit">Create Order</button>
            </div>
          </div>
        </form>
      </Col>
    </>
  );
};
