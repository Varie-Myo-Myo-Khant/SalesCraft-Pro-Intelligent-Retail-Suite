import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increase,
  decrease,
  productSubTotal,
  productTotalAmount,
  productTax,
  removeCartItem,
} from "../Slice/cartSlice";
import "../Styles/cart.css";
import { Row,Col } from "react-bootstrap";
import {FaMinus, FaPlus, FaShoppingCart, FaTimes } from "react-icons/fa";
import { CheckOutPayment } from "./CheckOutPayment";

export const ShoppingCart = () => {
  const { cartItems} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // Get current amount
  useEffect(() => {
      dispatch(productSubTotal());
      dispatch(productTax());
      dispatch(productTotalAmount());
    
  }, [dispatch, cartItems]);

  return (
    <>
      <Row className="cartHeader">
      <h3 className="cartTitle">
      <span > <FaShoppingCart/> Cart </span>
      <span>Total Items - {cartItems ? cartItems.length : 0}</span>
      </h3>  
      </Row>  

    <Row className="cartItemContainer">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((cart) => (
          <Row className="cartCard" key={cart.id}>
            <Col md="auto" className="cartimage">
              {cart.productImage ? (
                <img className="product-image" src={cart.productImage} alt="..." />
              ) : (
                <img
                  className="default-image"
                  src={require("../Images/products.png")}
                  alt="..."
                />
              )}
            </Col>

            <Col className="cartinfo">
              <h4>{cart.productName}</h4> 
              <Row className="priceRow">
                <Col>
                   <p>$ {cart.productPrice * cart.quantity}</p>
                </Col>
               <Col>
                <button className="increment-btn" type="button" onClick={() => {
                    dispatch(increase(cart.id));}}>
                  <FaPlus/>
                </button>
                <span className="amount">{cart.quantity}</span>
                <button className="decrement-btn" type="button"  onClick={() => {
                          dispatch(decrease(cart.id)); }}>
                <FaMinus/>
              </button>
           </Col>    
          </Row>
          <button className="remove-item"  type="button"  onClick={() => {
                  dispatch(removeCartItem(cart.id)); }} >
             <FaTimes/>
          </button>
          </Col>
          </Row>
        ))
      ) : (
         <Row className="cartCard">
            <span>There are no products in the cart.!</span>
          </Row>
      )}
  </Row>
        <CheckOutPayment />
   
    </>
  );
};


