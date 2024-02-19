import { Link } from "react-router-dom";
import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaEdit, FaPlusCircle, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Container,  Row, Col } from 'react-bootstrap';
import { getCategories } from "../Slice/categorySlice";
import { getProducts,searchByProductName,removeProduct,setEditProduct} from "../Slice/productSlice";
import { useNavigate } from "react-router-dom"; 
import "../Styles/product_category.css";
import { Loading } from "./Loading";

export const ProductMainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  //for products data
  const { products,loading,filterProduct} = useSelector((state) => state.product);  
   //for search query
  const [searchQuery, setSearchQuery] = useState(""); 


  // Get categories for category section
      useEffect(() => {
          dispatch(getCategories());
      }, [dispatch]);

  // First Get All products
  useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);

   //to control the listing of products
   let [currentproduct,setCurrentProduct]=useState(products)

   //searching     
    const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Dispatch the action with the search query
    dispatch(searchByProductName(event.target.value));
    setCurrentProduct(filterProduct)
  
  };

    //function to call when user click delete button
    const removeItem = (product) => {
    dispatch(removeProduct(product));
    window.location.reload();
  };

  //function to call when user click edit button
  const setEdit=(product)=>{
    //get product data from current product to set in the form when edit.
    const{ productName, productImage,productPrice,stockQuantity,category, userId}=product
    dispatch(
      setEditProduct({
        productName, productImage,productPrice,stockQuantity,category, userId,editProductId:product.id,
      })
    )
    navigate("/addproduct")
  }

const removequery=()=>{
  setSearchQuery("");
  setCurrentProduct(products)
}
   
  


  return (
   
      <Container className="mainLayout">
        <Row className="uppderBar">
          <Col className="Search">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="keywordsearch form-control"
                placeholder="Search by Product Name"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {(searchQuery) && <FaTimes className="clear-icon" onClick={removequery} />}
            </div>
          </Col>  
          <Col className="AddNew">
            <Link to="/addproduct">
              <FaPlusCircle className="menu-icon" />
              Add New Product
            </Link>
          </Col>
        </Row>

        <Row className="productContainer">
        {loading&&<Loading loading={loading}/>}
            
        {currentproduct !== undefined && currentproduct.map((product) => (
              <Col key={product.id} className="productCard"> 
                <Row className="productfirst">
                  <Col md="auto" className="pleft">
                   <img src={product.productImage} className="productImg" alt={product.productName} /> 
                  </Col>
                   <Col className="pright">
                          <span className="productName">
                            {product.productName ? 
                          (product.productName.charAt(0).toUpperCase() + product.productName.slice(1).replace(/-/g, ' ')) : ("")}
                          </span> 
                          <span className="pother">
                            Price : {product.productPrice} MMK
                          </span> 
                          <span className="pother">
                            On Hand : {product.stockQuantity} qt
                          </span> 
                          <span className="pbtnrow"> 
                            <button className="product_edit" type="button" onClick={()=>setEdit(product)}>
                              <FaEdit className="menu-icon" />
                              </button>
                          
                            <button className="product_delete" type="button" onClick={()=>removeItem(product)}>
                              <FaTrashAlt className="menu-icon" />
                            </button>
                          
                        </span>
                  </Col>
                </Row>
                
                
                
              </Col>
            ))}  
        </Row>
      
      </Container>

  );
}
