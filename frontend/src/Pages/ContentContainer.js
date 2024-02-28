import React from "react";
import '../Styles/navigation.css'
import {Row,Col} from 'react-bootstrap';
import { Outlet,Link } from "react-router-dom";
import {Header} from "./Header";


 import {
  FaHome,
  FaShoppingCart,
  FaProductHunt,  
  FaHistory,
  FaListAlt,
} from "react-icons/fa"; 

export const ContentContainer = () => { 
 

  
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
                    
                     
                        <Link to="session">
                        <FaShoppingCart className="menu-icon" />
                        Session
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
                     
                </div> 
               
            </Col>
           
            <Col className="mainOutlet">
                <Outlet />
            </Col>
          </Row>
    </section>
  );
};

 
