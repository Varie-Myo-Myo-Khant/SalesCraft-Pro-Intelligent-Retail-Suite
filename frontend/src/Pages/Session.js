import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container,Row,Col, Table,Modal, Button, Form } from 'react-bootstrap';
import { sessionCreate,setSessionId, clearValues, getSessions, deleteSession } from '../Slice/sessionSlice';
import { toast } from "react-toastify";
import { useNavigate  } from 'react-router-dom';
import { FaMinus,FaUserCircle } from 'react-icons/fa';
import '../Styles/session.css'
export const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [openingCash, setOpeningCash] = useState(0);
    const { sessions,sessionId} = useSelector((state) => state.session);
  let sessionList=1

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const handleStartSession = () => {
    setShowStartModal(true);
  };

  const handleStartModalClose = () => {
    setShowStartModal(false);
  };


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

console.log(sessionId)
  return (
    <Container className='sessionMain'>
     <Row>
      <Col md={5} className='sessionCard'>
        
      <span> <FaUserCircle /> Shop Name</span>
      <span>Current Balance:</span>
      <Button className='sessionBtn' onClick={sessionId ?() => navigate('/order'): handleStartSession }>
        {sessionId ? 'Continue Selling' : 'Start New Session'}
      </Button>
      </Col>
      </Row>

      <Modal show={showStartModal} onHide={handleStartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start New Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleStartSessionSubmit}>
            <Form.Group controlId="openingCash">
              <Form.Label>Enter Opening Cash</Form.Label>
              <Form.Control type="number" name='openingCash' value={openingCash} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Start New Session</Button>
          </Form>
        </Modal.Body>
      </Modal>

     

      <Row>
        <h2>Sales History</h2>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>No</th>
             <th>Start Time</th>
            <th>End Time</th>
            <th>Opening Cash</th>
            <th>Closing Cash</th>
            <th>Total Cash</th>
            <th>Cash in Hand</th>
            <th>Can in Bank</th>
             <th><FaMinus/></th>
          </tr>
        </thead>
        <tbody>
          {sessions && sessions.map((session) => (
             (session.userId === user.id ) && (
            <tr key={session.id}>
            <td>{sessionList++}</td>
            <td>{formatDateTime(session.startTime)}</td>
             <td>{formatDateTime(session.endTime)}</td>
              <td>{session.openingCash}</td>
              <td>{session.closingCash}</td>
              <td>{session.totalSales}</td>
              <td>{session.cashInHand}</td>
              <td>{session.cashInBank}</td>
              <td type='button' onClick={() => remove(session.id)}><FaMinus/></td>
            </tr>
          ))
        )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};


