import React from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { Table, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  increase,
  decrease,
  removeCartItem,
} from "../Slice/cartSlice";

export const CheckOutContent = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Col className="checkoutContent">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartItems ? (
          cartItems.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
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
                <Col>
                  <button
                    className="increment-btn"
                    type="button"
                    onClick={() => {
                      dispatch(increase(product.id));
                    }}
                  >
                    <FaPlus />
                  </button>
                  <span className="amount">{product.quantity}</span>
                  <button
                    className="decrement-btn"
                    type="button"
                    onClick={() => {
                      dispatch(decrease(product.id));
                    }}
                  >
                    <FaMinus />
                  </button>
                </Col>
              </td>
              <td>
                $ {(product.productPrice * product.stockQuantity).toFixed(2)}
              </td>
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
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">Products Loading...</td>
          </tr>
        )}
      </tbody>
    </Table>
    </Col>
    
  );
};

