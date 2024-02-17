import React from "react";
import '../Styles/homedashboard.css'
import {Row,Col} from 'react-bootstrap';
import { useNavigate, Outlet,Link } from "react-router-dom";
import {Header} from "../Components/Header";
import { useDispatch } from "react-redux";
import { logout, reset } from "../Slice/authSlice";

 import {
  FaHome,
  FaShoppingCart,
  FaProductHunt,  
  FaHistory,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa"; 

export const ContentContainer = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/",{ replace: true });
    };
  return (
    <section className="homedashboard">
        <Header /> 
    
        <Row className="maincontent">
             <Col md="auto" className="leftSideBar">
                <div className="menu-links">
                    
                        <Link to="/dashboard">
                        <FaHome className="menu-icon" />
                        Home
                        </Link>
                    
                     
                        <Link to="order">
                        <FaShoppingCart className="menu-icon" />
                        Order
                        </Link>
                     
                     
                        <Link to="product">
                        <FaProductHunt className="menu-icon" />
                        Product
                        </Link>

                        <Link to="category">
                        <FaListAlt className="menu-icon" />
                        Category
                        </Link>
                    
                    
                        <Link to="history">
                        <FaHistory className="menu-icon" />
                        History
                        </Link>
                     
                        <button className="logout-btn" onClick={logoutUser} >
                          <FaSignOutAlt className="logout-icon" />
                        </button>
                    
                </div> 
               
            </Col>
           
            <Col>
                <Outlet />
            </Col>
          </Row>
    </section>
  );
};

 
