import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, removeOrder } from "../Slice/orderSlice";
import { Container, Row, Col, Accordion, Button, Table } from "react-bootstrap";
import { OrderPrint } from "./OrderPrint";
import { useNavigate } from "react-router-dom";
import {FaTrashAlt } from "react-icons/fa";

export const History = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const deleteOrder = (order)  => {
  
  dispatch(removeOrder(order));
  window.location.reload()
};

  return (
    <Container>
      <Row>
        <Col>
          <h2>Order History</h2>
          <Accordion defaultActiveKey="0">
            {orders !== undefined &&
              orders.map((order, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    <Col>Order Number: {order.orderNumber}</Col>
                    <Col>Customer Name: {order.customer?order.customer:"Walk In Customer"}</Col>
                   
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>

                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.productPrice * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="2"><strong>Subtotal:</strong></td>
                          <td>${order.subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan="2"><strong>Total Amount:</strong></td>
                          <td>${order.totalAmount.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table> 
                    <Col><Button type="button" className="product_delete" onClick={() => deleteOrder(order)}><FaTrashAlt/></Button></Col>
                  </Accordion.Body>
                </Accordion.Item>
                 
              ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};


