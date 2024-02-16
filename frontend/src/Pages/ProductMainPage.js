import { Link } from "react-router-dom";
import React, { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEdit, FaPlusCircle, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Container,  Row, Col } from 'react-bootstrap';
import { getCategories } from "../Slice/categorySlice";
import { getProducts,searchByProductName,removeProduct,setEditProduct,categoryProductFilter } from "../Slice/productSlice";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "../Styles/product_category.css";

import ReactSimplyCarousel from 'react-simply-carousel';

export const ProductMainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for carousel
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  //for products data
  const { products,loading,filterProduct} = useSelector((state) => state.product);  
  // Get categories for categories section
  const { categories } = useSelector((state) => state.category); 
  //to control the listing of products
   let [currentproduct,setCurrentProduct]=useState(products)
   //for search query
  const [searchQuery, setSearchQuery] = useState("");
  //for inputfield cursor focus
  const inputRef = useRef(null);


  // Get categories for category section
      useEffect(() => {
          dispatch(getCategories());
      }, [dispatch]);

  // First Get All products
  useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);

    //Function to filter products according to category
    const filtering=(category)=>{ 
            dispatch(categoryProductFilter(category)); 
           setCurrentProduct(filterProduct)
        }   

   //searching     
    const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Dispatch the action with the search query
    dispatch(searchByProductName(event.target.value));
    setCurrentProduct(filterProduct)
    inputRef.current.focus();
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
    navigate("/dashboard/addproduct")
  }


  //for loading effect
  const override = {
    display: "block",
    margin: "0 auto",
  };
  


  return (
   
      <Container>
        <Row className="uppderBar">
          <Col className="Search">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                ref={inputRef}
                className="keywordsearch form-control"
                placeholder="Search by Product Name"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && <FaTimes className="clear-icon" onClick={() => setSearchQuery("")} />}
            </div>
          </Col>

         
          <Col md="auto" className="AddNew">
            <Link to="/dashboard/addproduct">
              <FaPlusCircle className="menu-icon" />
              Add New Product
            </Link>
          </Col>
        </Row>

        <Row className="categoryFilter">
            <ReactSimplyCarousel   
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                updateOnItemClick	={true}
                forwardBtnProps={{
                  //here you can also pass className, or any other button element attributes
                  className:"BtnProps", children: <span><FaAngleDoubleRight/></span>,
                }}
                backwardBtnProps={{
                  //here you can also pass className, or any other button element attributes
                className:"BtnProps",children: <span><FaAngleDoubleLeft/></span>,
                }}
                responsiveProps={[
                  {minWidth: 1000, itemsToShow: 12}, 
                  {minWidth: 768, maxWidth: 1000, itemsToShow: 7}, 
                  {maxWidth: 767, itemsToShow: 5}
                ]}
                speed={400}
                easing="linear"
              >
          
              <button className="smallcategory" type="button" onClick={()=>setCurrentProduct(products)}>  
                  All
              </button>
              {categories !== undefined && categories.map((category) => (
                  <button className="smallcategory" type="button" key={category.id} onClick={()=>filtering(category.category)}>  
                     {category.category} 
                </button>
                ))} 
            </ReactSimplyCarousel>
        </Row>

        <Row className="categoryContainer">
           {
           loading&& 
           <ClipLoader size="60" color="var(--main-red)" cssOverride={override} />
           }
            
        {currentproduct !== undefined && currentproduct.map((product) => (
              <Col key={product.id} className="categoryCard"> 
                
                 <img src={product.productImage} className="categoryimg" alt={product.productName} /> 
                <span className="categoryName">{product.productName}</span> 
                <Row>
                  <Col>
                    <button className="product_edit" type="button" onClick={()=>setEdit(product)}>
                      <FaEdit className="menu-icon" />
                      </button>
                  </Col>
                  <Col>
                    <button className="product_delete" type="button" onClick={()=>removeItem(product)}>
                      <FaTrashAlt className="menu-icon" />
                    </button>
                  </Col>
                </Row>
              </Col>
            ))} 
    
        
         
        </Row>
      
      </Container>

  );
}
