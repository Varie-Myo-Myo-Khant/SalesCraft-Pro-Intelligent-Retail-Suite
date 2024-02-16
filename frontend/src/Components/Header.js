import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import '../Styles/homedashboard.css'
import brandlogred from '../Images/brandlogo_red.png';
import {FaUserCircle} from "react-icons/fa";

export const Header=() =>{

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const timerID = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    const date = new Date();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes();
    const seconds=date.getSeconds();
    const period = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    setCurrentTime(formattedTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setCurrentDate(formattedDate);
  };



  return (
    <Navbar   className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="\homedashboard"><img src={brandlogred} className='homelogo'/></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             <div className='currentTime'>
              {currentTime}   {currentDate}
             </div>
          </Navbar.Text>
          <Navbar.Text>
             <a href="#login">
              <FaUserCircle className="menu-icon" />
               
             </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

