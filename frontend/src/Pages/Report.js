import React from "react";
import { useSelector } from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import "../Styles/report.css"
import { FaArrowRight, FaChartLine, FaListAlt, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import {Link } from "react-router-dom";

export const Report = () => {
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const {orders}=useSelector((state)=>state.order);

  return (
    <Container className="reportContainer">
     
      <Row className="statistic-layout">

        <Col className="statistics">
          <span className="statistic-title"><FaChartLine />Total Sales</span>
          <span className="statistic-number">${orders.length}</span>
         <span className="statistic-details"> <Link to="/history"> View Details <FaArrowRight/></Link> </span> 
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaShoppingCart/>  Orders</span>
          <span className="statistic-number">${orders.length}</span> 
          <span className="statistic-details"> <Link to="/history"> View Details <FaArrowRight/></Link> </span> 
        </Col>


       <Col className="statistics">
          <span className="statistic-title"><FaProductHunt/>Products</span> 
          <span className="statistic-number">{products.length}</span>
          <span className="statistic-details"> <Link to="/product"> View Details <FaArrowRight/></Link> </span> 
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaListAlt/>Categories</span>
          <span className="statistic-number">{categories.length}</span>
          <span className="statistic-details"> <Link to="/category"> View Details <FaArrowRight/></Link> </span> 
        </Col>
      
      </Row>
      <Row>
        <Col>
        Top Selling Report
        </Col>
      </Row>
      <Row>
        <Col>
        Promotion Report
        </Col>
      </Row>
    </Container>
  );
};

