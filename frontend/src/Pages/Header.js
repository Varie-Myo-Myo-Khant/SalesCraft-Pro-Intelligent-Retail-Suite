import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { logout, reset } from "../Slice/authSlice";
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/navigation.css'
import brandlogred from '../Images/brandlogo2.svg';
import {FaUserCircle,FaSignOutAlt} from "react-icons/fa";
import { useNavigate} from "react-router-dom";


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

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/",{ replace: true });
    };


  return (
    <Navbar  sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="\dashboard"><img src={brandlogred} alt="brandlogo" className='homelogo'/></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             <div className='currentTime'>
              {currentTime}   {currentDate}
             </div>
          </Navbar.Text>
          <Navbar.Text>
             <a href="profile">
              <FaUserCircle className="menu-icon" />      
             </a>
          </Navbar.Text>
           <Navbar.Text >
             <button  className="logout-btn" onClick={logoutUser} >
               <FaSignOutAlt className="logout-icon" />     
             </button>
          </Navbar.Text> 
                    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

