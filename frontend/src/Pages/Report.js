import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaChartArea, FaChartLine, FaClipboardList, FaExclamationCircle, FaListAlt, FaProductHunt, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PromotionDataPage } from "./PromotionDataPage";
import { getOrders } from "../Slice/orderSlice";
import { getProducts } from "../Slice/productSlice";
import { getSessions } from "../Slice/sessionSlice";
import { getCategories } from "../Slice/categorySlice";
import { getCustomers } from "../Slice/customerSlice";
import Chart from "chart.js/auto";
import "../Styles/report.css"; 
export const Report = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getSessions());
    dispatch(getCategories());
    dispatch(getCustomers());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { sessions } = useSelector((state) => state.session);
    const { customers } = useSelector((state) => state.customer);

  // Filter categories by userId
  const userCategories = categories.filter(category => category.userId === user.id);

  // Filter products by userId
  const userProducts = products.filter(product => product.userId === user.id);

  // Filter orders by userId
  const userOrders = orders.filter(order => order.userId === user.id);
  // Filter users by userId
  const userCustomers = customers.filter(customer => customer.userId === user.id);

  // Calculate total sales from sessions with the same userId
  const totalSales = sessions
    .filter((session) => session.userId === user.id && session.totalSales !== null)
    .reduce((acc, session) => acc + session.totalSales, 0);

    //filter products which are less than 5
  const productsToRestock = userProducts.filter(product => product.stockQuantity < 5);

  // Calculate the top 5 selling products
  const calculateTopSellingProducts = () => {
   
    const productSales = {};

  // Iterate through each order
  userOrders.forEach((order) => {
    // Iterate through each cartItem in the order
    order.cartItems.forEach((cartItem) => {
      const productId = cartItem.id;
      const quantity = cartItem.quantity;

      // Aggregate the quantity for each product
      if (productId in productSales) {
        productSales[productId] += quantity;
      } else {
        productSales[productId] = quantity;
      }
    });
  });
  // Transform productSales object into an array of objects containing both productId and quantity
  const productSalesArray = Object.keys(productSales).map(productId => ({
    productId: productId,
    quantity: productSales[productId]
  }));
  console.log("After finding",productSalesArray)
  // Sort the productSalesArray by quantity in descending order
  productSalesArray.sort((a, b) => b.quantity - a.quantity);
  console.log("After sorting",productSalesArray)
  // Get the top 5 products
  const topProducts = productSalesArray.slice(0, 5);
  console.log("After slicing",topProducts)
  // Return the top 5 products with their names
  return topProducts.map(product => {
    // Find the cartItem with the matching productId and retrieve its name
    const productDetails = orders.flatMap(order => order.cartItems).find(cartItem => cartItem.id === product.productId);
    return {
      name: productDetails.productName,
      quantity: product.quantity
    };
  });
};


//Chart for top 5 selling products 
  useEffect(() => {
  const topSellingProducts = calculateTopSellingProducts();
  console.log("after calculation", topSellingProducts);

  // Get the canvas element
  const ctx = document.getElementById("topSellingChart");

  // Check if there's an existing Chart instance
  let chartInstance = ctx.chart;
  if (chartInstance) {
    // If an existing Chart instance exists, destroy it
    chartInstance.destroy();
  }

  // Create a new Chart instance
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: topSellingProducts.map((product) => product.name),
      datasets: [{
        label: "Sales Quantity",
        data: topSellingProducts.map((product) => product.quantity),
        backgroundColor: "#000",
        borderColor: "#7662EE",
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
       
      }
    }
  });

  // Store the Chart instance in the canvas element
  ctx.chart = chartInstance;
}, [orders, calculateTopSellingProducts]);



  return (
    <Container className="reportContainer">
      <Row className="statistic-layout">
        <Col className="statistics">
          <span className="statistic-title"><FaChartLine />Total Sales</span>
          <span className="statistic-number">Ks {totalSales.toLocaleString()} </span>
          <span className="statistic-details"> <Link to="/session"> View Details <FaArrowRight /></Link> </span>
        </Col>

        <Col className="statistics">
          <span className="statistic-title"><FaShoppingCart />  Orders</span>
          <span className="statistic-number">{userOrders.length}</span>
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
        {/* <Col className="statistics">
          <span className="statistic-title"><FaUserCircle />Customers</span>
          <span className="statistic-number">{userCustomers.length}</span>
          <span className="statistic-details"> 
          <Link to="/product"> View Details <FaArrowRight /></Link> 
          </span>
        </Col> */}
      </Row>


      <Row className="analysisCharts">
        
        <Col md={4}>
        <h3><FaClipboardList/> Most Paired Products</h3>
       {userOrders.length === 0 ?"": <PromotionDataPage />}
        </Col>

         <Col md={5}>
          <h3> <FaChartArea/> Top Selling roducts</h3>
          <div className="chartDiv">
            <canvas id="topSellingChart"></canvas>
          </div>
        </Col>


        <Col md={3} >
          <h3><FaExclamationCircle/> Restock Needed</h3>
          <div  className="restockdiv">
            {productsToRestock.map((product) => (
              <div className="restocklist" key={product.id}>
                <p>
                <img className="addsmallimage" src={product.productImage} alt={product.productName} />
                </p>
                <p className="restockcaption"> 
                <b>{product.productName} </b>
                {product.stockQuantity === 0 ? <span style={{ color: "red" }}> (Out of Stock)</span> : <span> Remaining: {product.stockQuantity} qty</span> }
                </p>
              </div>
            ))}
         </div>
        </Col>
      </Row>

    </Container>
  );
};
