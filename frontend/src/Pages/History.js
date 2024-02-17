import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders,removeOrder } from "../Slice/orderSlice"; 
import { Container,  Row, Col } from 'react-bootstrap';
import { OrderPrint } from "./OrderPrint";
import { useNavigate } from "react-router-dom";


export const History = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
const navigate = useNavigate();


  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const deleteOrder = (order) => {
    dispatch(removeOrder(order));
    navigate("/dashboard");
  };

  return (
    <Container>
       
       {orders !== undefined && orders.map((order) => (
    <Col className="order-details" key={order.id}>
        <div className="order-title">
            <span className="order-id">Order Id: # {order.id}</span>
            <span className="order-time"> Customer: {order.customer} </span>
        </div>

        <div className="order-total">
            <span className="qta">
            Sold :
            {order.cartItems.reduce((prev, cur) => {
                return prev + cur.quantity;
            }, 0)}
            </span>

        <span className="order-price-detail">
          <span className="order-price">$ {order.totalAmount.toFixed(2)}</span>
          <OrderPrint order={order} />
        </span>
      </div>

      
        <div>
          <button
            className="order-delete"
            onClick={() => {
              deleteOrder(order);
            }}
          >
            X
          </button>
        </div>
      
    </Col>
            ))} 
   
    </Container>
  );
};
