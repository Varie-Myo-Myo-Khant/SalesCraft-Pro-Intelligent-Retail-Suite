import React from "react";
import '../Styles/homedashboard.css'
import {Row,Col} from 'react-bootstrap';
import { Outlet,Link } from "react-router-dom";
import {Header} from "../Components/Header";
 import {
  FaHome,
  FaShoppingCart,
  FaProductHunt,  
  FaHistory,
} from "react-icons/fa"; 

export const HomeDashboard = () => {


  return (
    <section className="homedashboard">
        <Header /> 
    
        <Row className="maincontent">
             <Col md="auto" className="leftSideBar">
                <div className="menu-links">
                    
                        <Link to="/homedashboard">
                        <FaHome className="menu-icon" />
                        Home
                        </Link>
                    
                     
                        <Link to="/homedashboard/order">
                        <FaShoppingCart className="menu-icon" />
                        Order
                        </Link>
                     
                     
                        <Link to="/homedashboard/product">
                        <FaProductHunt className="menu-icon" />
                        Products
                        </Link>
                    
                    
                        <Link to="/homedashboard/history">
                        <FaHistory className="menu-icon" />
                        History
                        </Link>
                     
                    
                </div> 
               
            </Col>
           
            <Col>
                <Outlet />
            </Col>
          </Row>
    </section>
  );
};

 
