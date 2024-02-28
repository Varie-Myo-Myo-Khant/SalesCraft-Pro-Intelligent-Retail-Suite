import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaChartLine, FaListAlt, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/report.css"; 

export const Report = () => {
  const user = useSelector((state) => state.auth.user); // Assuming you have user information in your auth state
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  // Filter categories by userId
  const userCategories = categories.filter(category => category.userId === user.id);

  // Filter products by userId
  const userProducts = products.filter(product => product.userId === user.id);

  // Filter orders by userId
  const userOrders = orders.filter(order => order.userId === user.id);

  return (
    <Container className="reportContainer">
      <Row className="statistic-layout">
        <Col className="statistics">
          <span className="statistic-title"><FaChartLine />Total Sales</span>
          <span className="statistic-number">${userOrders.length}</span>
          <span className="statistic-details"> <Link to="/history"> View Details <FaArrowRight /></Link> </span>
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaShoppingCart />  Orders</span>
          <span className="statistic-number">${userOrders.length}</span>
          <span className="statistic-details"> <Link to="/history"> View Details <FaArrowRight /></Link> </span>
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaProductHunt />Products</span>
          <span className="statistic-number">{userProducts.length}</span>
          <span className="statistic-details"> <Link to="/product"> View Details <FaArrowRight /></Link> </span>
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaListAlt />Categories</span>
          <span className="statistic-number">{userCategories.length}</span>
          <span className="statistic-details"> <Link to="/category"> View Details <FaArrowRight /></Link> </span>
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
