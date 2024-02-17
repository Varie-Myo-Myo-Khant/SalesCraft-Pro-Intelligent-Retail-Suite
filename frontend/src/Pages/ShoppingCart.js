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
    <div className="cart">
      <div className="cart-header">
        <div className="cart-title">
          <span>Cart Items</span>
          <span>Cart Table</span>
        </div>

        <div className="cart-number">
          <h3># {cartItems ? cartItems.length : 0}</h3>
          <h3>T1</h3>
        </div>
      </div>

      {cartItems && cartItems.length > 0 ? (
        cartItems.map((cart) => (
          <div className="cart-items" key={cart.id}>
            <div className="image">
              {cart.productImage ? (
                <img className="product-image" src={cart.productImage} alt="..." />
              ) : (
                <img
                  className="default-image"
                  src={require("../Images/LoginBgn.png")}
                  alt="..."
                />
              )}
            </div>

            <div className="info">
              <h4>{cart.productName}</h4>

              <button
                className="remove-item"
                type="button"
                onClick={() => {
                  dispatch(removeCartItem(cart.id));
                }}
              >
                X
              </button>

              <div className="details">
                <div className="status">
                  <span className="status-note">Category:</span>
                  <p className="status-text">{cart.category}</p>
                </div>

                <div className="price">
                  <p>$ {cart.productPrice}</p>
                </div>

                <div className="count">
                  <button
                    className="increment-btn"
                    type="button"
                    onClick={() => {
                      dispatch(increase(cart.id));
                    }}
                  >
                    +
                  </button>
                  <span className="amount">{cart.quantity}</span>
                  <button
                    className="decrement-btn"
                    type="button"
                    onClick={() => {
                      dispatch(decrease(cart.id));
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="cart-empty">
          <div className="cart-title">
            <span>There are no products in the cart.</span>
          </div>
        </div>
      )}

      <div className="total-card">
        <div className="total-items">
          <span className="items-count">Items ({cartItems ? cartItems.length : 0})</span>
          <span className="items-price">$ {subTotal.toFixed(2)}</span>
        </div>
        <div className="item-taxs">
          <span className="item-tax">Tax (%8)</span>
          <span className="item-tax-price">$ {tax.toFixed(2)}</span>
        </div>
        <div className="divider"></div>
        <div className="total">
          <span className="total-text">Total </span>
          <span className="total-item-price">$ {totalAmount.toFixed(2)}</span>
        </div>

        <div className="pay">
          <button className="pay-btn" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};


