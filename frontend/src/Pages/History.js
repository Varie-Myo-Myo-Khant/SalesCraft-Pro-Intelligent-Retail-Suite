import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, removeOrder } from "../Slice/orderSlice";
import { Container, Row, Col, Accordion, Table } from "react-bootstrap";
import { OrderPrint } from "./OrderPrint"; 
import {FaPrint, FaTrashAlt } from "react-icons/fa";
import "../Styles/history.css"
export const History = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const deleteOrder = (order)  => {
  
  dispatch(removeOrder(order));
  window.location.reload()
};
function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${formattedDate} ${formattedTime}`;
}
  return (
    <Container className='sessionMain'>
      <Row> 
          <h3>Orders History</h3>
          <div className="orderDiv">
          <Accordion >
            {orders !== undefined &&
              orders.map((order, index) => (
                 (order.userId === user.id ) && (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header >
                    
                    <Col> {order.orderNumber}</Col>
                    <Col>{formatDateTime(order.createdTime)}</Col>
                    <Col>Total Amount : {order.totalAmount.toLocaleString()}</Col>
                    <Col>Customer : {order.customer?order.customer:"Walk In Customer"}</Col>
                     
                    <Col md="auto" className="printBtn"><FaPrint/> <OrderPrint order={order} /></Col>
                   <Col md="auto"><a type="button" className="order_delete" onClick={() => deleteOrder(order)}><FaTrashAlt/></a></Col>
                  
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table className="invocieTable" bordered hover>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>Ks{(item.productPrice * item.quantity).toLocaleString()}</td>
                            
                          </tr>
                        ))}
                        
                        <tr className="lastRow">
                          <td colSpan="2"><strong>Total Amount:</strong></td>
                          <td><strong>Ks{order.totalAmount.toLocaleString()}</strong></td>
                        </tr>
                      </tbody>
                    </Table> 
                    
                  </Accordion.Body>
                </Accordion.Item>
                 
              ))
            )}
          </Accordion>
           </div>               
      </Row>
    </Container>
  );
};


