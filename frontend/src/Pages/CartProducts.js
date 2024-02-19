import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch, FaTimes} from "react-icons/fa";
import { Container,  Row, Col } from 'react-bootstrap';
import { getCategories } from "../Slice/categorySlice";
import { getProducts,searchByProductName,categoryProductFilter } from "../Slice/productSlice";
import "../Styles/product_category.css";
import { addToCart } from "../Slice/cartSlice";
import { productSubTotal,productTax,productTotalAmount } from "../Slice/cartSlice";
import ReactSimplyCarousel from 'react-simply-carousel';
import { Loading } from "./Loading"; 

export const CartProducts = () => {

  const dispatch = useDispatch();
  //for carousel
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
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

    // Get categories for categories section
  const { categories } = useSelector((state) => state.category); 
  //to control the listing of products
   let [currentproduct,setCurrentProduct]=useState(products)


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
  };

  const removequery=()=>{
    setSearchQuery("");
    setCurrentProduct(products)
    }


    //Add the product to cart
    const addCart = (product) => {
    dispatch(addToCart(product));
  };

      const { cartItems } = useSelector((state) => state.cart);
      const { user } = useSelector((state) => state.auth);

      useEffect(() => {
        dispatch(productSubTotal());
        dispatch(productTax());
        dispatch(productTotalAmount());
      }, [dispatch, cartItems]);




  return (
   
      <>
        <Row className="orderSearchContainer">
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
              {searchQuery && <FaTimes className="clear-icon" onClick={removequery} />}
            </div>
          </Col>

        </Row>

        <Row className="categoryFilter">
          {loading&&<Loading loading={loading}/>}
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
                  {minWidth: 1000, itemsToShow: 8}, 
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

        <Row className="orderproductContainer">
        {loading&&<Loading loading={loading}/>}
        {currentproduct !== undefined && currentproduct.map((product) => (
             
               product.stockQuantity === 0 ? (
                        <Col key={product.id} className="orderCard outof">
                        <Row className="orderfirst">
                         <span className="productName"> Out Of Stock!</span>
                        <img src={product.productImage} className="orderImg" alt={product.productName} /> 
                        <span className="productName">
                          {product.productName ? 
                        (product.productName.charAt(0).toUpperCase() + product.productName.slice(1).replace(/-/g, ' ')) : ("")}
                        </span> 
                        <span className="pother">
                          Price : {product.productPrice} MMK
                        </span> 
                       
                      </Row>
                      </Col>
                      ) : (
              <Col key={product.id} className="orderCard" onClick={() => {addCart(product);}}>
                <Row className="orderfirst">
                    <img src={product.productImage} className="orderImg" alt={product.productName} /> 
                    <span className="productName">
                      {product.productName ? 
                    (product.productName.charAt(0).toUpperCase() + product.productName.slice(1).replace(/-/g, ' ')) : ("")}
                    </span> 
                    <span className="pother">
                      Price : {product.productPrice} MMK
                    </span> 
                  </Row>  
                 </Col>
                )
             
            ))} 
    
        
         
        </Row>
      
      </>

  );
}
