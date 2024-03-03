import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container,Row,Col, Table,Modal, Button, Form } from 'react-bootstrap';
import { sessionCreate,setSessionId, getSessions, deleteSession } from '../Slice/sessionSlice';
import { toast } from "react-toastify";
import { useNavigate  } from 'react-router-dom';
import { FaTrashAlt,FaChartLine,FaUserCircle,FaShoppingCart} from 'react-icons/fa';
import '../Styles/session.css';
import { getProfile } from '../Slice/profileSlice';
import { getOrders } from "../Slice/orderSlice";

export const Session = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);
  const { user } = useSelector((store) => store.auth); 
   const { orders } = useSelector((state) => state.order);
  const { profile } = useSelector((store) => store.profile);
  const [openingCash, setOpeningCash] = useState(0);
  const { sessions,sessionId} = useSelector((state) => state.session);

  let sessionList=1

  useEffect(() => {
    dispatch(getProfile(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    dispatch(getSessions());
     dispatch(getOrders());
  }, [dispatch]);

  const handleStartSession = () => {
    setShowStartModal(true);
  };

  const handleStartModalClose = () => {
    setShowStartModal(false);
  };

  // Filter orders by userId
  const userOrders = orders.filter(order => order.userId === user.id);

 const handleStartSessionSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionCreate({ openingCash, userId: user.id }))
      .then((response) => {
        handleStartModalClose();
        dispatch(setSessionId(response.payload)); // Update session ID in Redux store
       
        toast.success("Successfully Added New Session!");
        navigate('/order'); // Navigate to the order page
      })
      .catch((error) => {
        console.error('Error starting session:', error);
      });
  };


  const remove = (sessionId) => {
    console.log("from remove",sessionId)
    dispatch(deleteSession(sessionId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'openingCash') {
      setOpeningCash(value);
    } 
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

// Calculate total sales from sessions with the same userId
  const totalSales = sessions
    .filter((session) => session.userId === user.id && session.totalSales !== null)
    .reduce((acc, session) => acc + session.totalSales, 0);


  return (
    <Container className='sessionMain'>
     <Row className="statistic-layout">
      
      <Col md={5} className='statistics'>
      <span className="statistic-title"> 
      {profile.shopLogo !== null && profile.shopLogo ? (
                <img src={profile.shopLogo} className="userImg" alt={profile.shopName} />
              ) : (
                <FaUserCircle className="menu-icon" />   
              )}
       <span style={{ marginLeft: '10px' }}> {profile.shopName}</span>
    </span>
      <b>Address : {profile.shopAddress}</b>
      <Button className='sessionBtn' onClick={sessionId ?() => navigate('/order'): handleStartSession }>
        {sessionId ? 'Continue Selling' : 'Start New Session'}
      </Button>
      </Col>
       <Col md={3} className="statistics">
          <span className="statistic-title">
            <FaChartLine />Total Sales
            </span>
           <span className="statistic-details"> </span>
          <span className="statistic-number">Ks {totalSales.toLocaleString()} </span>
         
        </Col>
         <Col md={2} className="statistics">
          <span className="statistic-title"><FaShoppingCart />  Orders</span>
            <span className="statistic-details"> </span>
          <span className="statistic-number">{userOrders.length}</span>
        
        </Col>
      </Row>

      <Modal show={showStartModal} onHide={handleStartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start New Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleStartSessionSubmit}>
            <Form.Group controlId="openingCash">
              <Form.Label  className='modalLabel'>Enter Opening Cash</Form.Label>
              <Form.Control type="number" name='openingCash' value={openingCash} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Start New Session</Button>
          </Form>
        </Modal.Body>
      </Modal>

     

      <Row>
        <h3>Sales History</h3>
        <div className='sessionDiv'>
        <Table hover>
          <thead>
          <tr>
            <th>No</th>
             <th>Date</th>
            
            <th>Opening Cash</th>
            <th>Closing Cash</th>
            <th>Total Amount</th>
            <th>Cash in Hand</th>
            <th>Cash in Bank</th>
             <th><FaTrashAlt/></th>
          </tr>
        </thead>
        <tbody>
          {sessions && sessions.map((session) => (
             (session.userId === user.id ) && (
            <tr key={session.id}>
            <td>{sessionList++}</td>
            <td>{formatDateTime(session.startTime)}</td>
              <td>{session.openingCash.toLocaleString()}</td>
              <td>{session.closingCash && session.closingCash.toLocaleString()}</td>
              <td>{ session.closingCash && session.totalSales.toLocaleString()}</td>
              <td>{session.closingCash && session.cashInHand.toLocaleString()}</td>
              <td>{session.closingCash && session.cashInBank.toLocaleString()}</td>
              <td type='button' onClick={() => remove(session.id)}><FaTrashAlt/></td>
            </tr>
          ))
        )}
          </tbody>
        </Table>
        </div>
      </Row>
    </Container>
  );
};


