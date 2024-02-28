import React, { useState,useRef, useEffect } from "react"; 
import { Row, Card} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart,productSubTotal,productTotalAmount, productTax} from "../Slice/cartSlice";
import { orderCreate } from "../Slice/orderSlice";
import { deleteLocalStorageCart } from "../Services/localStorage";
import {NewCustomerModal} from './NewCustomerModal';
import { toast } from 'react-toastify';
import { getCustomers } from "../Slice/customerSlice";
import { FaPlusCircle,FaAngleRight, FaPrint } from "react-icons/fa";
import "../Styles/cart.css";
import { OrderPrint } from "./OrderPrint";
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint hook


export const CheckOutPayment = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { customers} = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const componentRef = useRef(); // Ref for OrderPrint component

  const [paymentType, setPaymentType] = useState("Cash");
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [customer, setCustomer] = useState("");
    useEffect(() => {
      dispatch(getCustomers()); // Fetch customers
    }, [dispatch]);

// Get current amount
  useEffect(() => {
      dispatch(productSubTotal());
      dispatch(productTax());
      dispatch(productTotalAmount());
    
  }, [dispatch, cartItems]);

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
    
    <Row className="cartAmount">
        <form onSubmit={handleSubmit} className="carForm">
         

          <p className="total-items">
          <span className="items-count">Sub Total : Items ({cartItems.length})</span>
          <span className="items-price">$ {subTotal.toFixed(2)}</span>
          </p>
          <p className="item-taxs">
            <span className="item-tax">Tax (8%)</span>
            <span className="item-tax-price">$ {tax.toFixed(2)}</span>
          </p>
            <p className="divider"></p>
            <p className="total">
              <span className="total-text">Total </span>
              <span className="total-item-price">$ {totalAmount.toFixed(2)}</span>
            </p>

        <p className="paymentRow">
          Payment Type :
              <Card >
                <Card.Body>
                 
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
              <Card>
                <Card.Body>
                 
                 
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
          </p>
           <p className="firstRow">
          
           <select className="customer-select" onChange={handleCustomerSelect} >
            <option value="" selected>Select Customer</option>
                <option value="Walk in Customer" >Walk in Customer</option>
                {customers !== undefined && customers.map((customer) => (
                  (customer.userId === user.id ) && (
                    <option value={customer.customer}>{customer.customer} : {customer.loyaltyPoint} Points</option>
                    ))
                  )}
          </select>
           <a href="#" className="customerdiv" onClick={handleNewCustomer}> <FaPlusCircle/> Add New Customer</a>
          </p>
         
             
       
         <NewCustomerModal show={showNewCustomerModal} handleClose={() => setShowNewCustomerModal(false)}
              handleNewCustomerAdded={handleNewCustomerAdded}
            />

          <p className="pay">
          <button type="submit" className="btntype2" disabled={cartItems.length === 0} > 
            <span>Payment </span>
          <span><FaAngleRight/></span>
          </button>
           <p className="printBtn" disabled={cartItems.length === 0} > 
            <FaPrint/> <OrderPrint ref={componentRef} order={{ cartItems, subTotal, totalAmount, tax, paymentType, customer, user }}/> 
          
          </p>
        </p>

         
            
         
        </form>
      
      </Row>
  
  );
};
