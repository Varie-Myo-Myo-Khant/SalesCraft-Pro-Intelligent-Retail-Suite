import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaAngleRight, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

export const ShoppingCart = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector((state) => state.cart);
  const navigate = useNavigate();
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
      <h3>Total Items - {cartItems ? cartItems.length : 0}</h3>
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
                  src={require("../Images/LoginBgn.png")}
                  alt="..."
                />
              )}
            </Col>

            <Col className="cartinfo">
              <h3>{cart.productName}</h3> 
              <Row className="priceRow">
                <Col>
                   <p>$ {cart.productPrice}</p>
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
  <Row className="cartAmount">
        <p className="total-items">
          <span className="items-count">Items ({cartItems ? cartItems.length : 0})</span>
          <span className="items-price">$ {subTotal.toFixed(2)}</span>
        </p>
        <p className="item-taxs">
          <span className="item-tax">Tax (%8)</span>
          <span className="item-tax-price">$ {tax.toFixed(2)}</span>
        </p>
        <p className="divider"></p>
        <p className="total">
          <span className="total-text">Total </span>
          <span className="total-item-price">$ {totalAmount.toFixed(2)}</span>
        </p>

        <p className="pay">
          <button className="btntype2" disabled={cartItems.length === 0} onClick={() => navigate("/checkout")}>

            <span>Pay </span>
          <span><FaAngleRight/></span>
          </button>
        </p>
    </Row>
    </>
  );
};


