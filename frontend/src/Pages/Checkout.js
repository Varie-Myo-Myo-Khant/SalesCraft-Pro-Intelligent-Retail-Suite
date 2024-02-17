import { React, useEffect, useState } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/cart.css"
import {
  clearCart,
  increase,
  decrease,
  productSubTotal,
  productTotalAmount,
  productTax,
  removeCartItem,
} from "../Slice/cartSlice";
import { orderCreate } from "../Slice/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteLocalStorageCart } from "../Services/localStorage";

export const Checkout = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productSubTotal());
    dispatch(productTax());
    dispatch(productTotalAmount());
  }, [dispatch, cartItems]);

  const [customer, setCustomer] = useState(""); 
  const [paymentType, setPaymentType] = useState("Cash");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
    orderId:119,
      customer,
      cartItems,
      subTotal,
      totalAmount,
      tax,
      paymentType,
      userId: user.id,
    };

    //Creating after order submit
    if (customer !== "") {
      dispatch(orderCreate(newOrder));
      dispatch(clearCart());
      deleteLocalStorageCart();
      navigate("/dashboard");
    } else {
      toast.warning("Please fill in the required fields");
    }
  };

    if (cartItems.length === 0) {
    return (
      <div className="info-details">
        <div className="icon-info">
          <div className="icon">
            <Link to="/dashboard">
              <FaHome className="icon-cart" />
            </Link>
          </div>
          <span>Return to the main page and add products to the cart.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div id="shop-container">
        <section id="cart">
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (
                cartItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeCartItem(product.id));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </td>
                    <td>
                      {product.productImage ? (
                        <img
                          className="product-image"
                          src={product.productImage}
                          alt="..."
                        />
                      ) : (
                        <img
                          className="default-image"
                          src={require("../Images/LoginBgn.png")}
                          alt="..."
                        />
                      )}
                    </td>
                    <td>{product.productName}</td>
                    <td>$ {product.productPrice.toFixed(2)}</td>
                    <td>
                      <div className="count">
                        <button
                          className="increment-btn"
                          type="button"
                          onClick={() => {
                            dispatch(increase(product.id));
                          }}
                        >
                          +
                        </button>
                        <span className="amount">{product.quantity}</span>
                        <button
                          className="decrement-btn"
                          type="button"
                          onClick={() => {
                            dispatch(decrease(product.id));
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>$ {(product.productPrice * product.stockQuantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <div>Products Loading...</div>
              )}
            </tbody>
          </table>
        </section>

        <div className="cart-summary styled">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <div className="customer">
                <input
                  className="customer-name"
                  name="customer"
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="enter customer"
                />
              </div>
              
                    <div className="states">
                      <div>
                        <label htmlFor="payment">Payment Method</label>
                        <select
                          name="payment"
                          id="payment"
                          value={paymentType}
                          onChange={(e) => setPaymentType(e.target.value)}
                        >
                          <option defaultValue="cash">Cash</option>
                          <option defaultValue="credit card">
                            Credit Card
                          </option>
                        </select>
                      </div>
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
                  <button type="submit" onSubmit={handleSubmit}>Create Order</button>
                </div>
              </div>
          
          </form>
        </div>
      </div>
    </div>
  );
};

