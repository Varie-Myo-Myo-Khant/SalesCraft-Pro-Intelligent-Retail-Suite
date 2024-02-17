import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Container,  Row, Col } from 'react-bootstrap';
import { getCategories } from "../Slice/categorySlice";
import { getProducts,searchByProductName,categoryProductFilter } from "../Slice/productSlice";
import ClipLoader from "react-spinners/ClipLoader";
import "../Styles/product_category.css";
import { addToCart } from "../Slice/cartSlice";
import { productSubTotal,productTax,productTotalAmount } from "../Slice/cartSlice";
import ReactSimplyCarousel from 'react-simply-carousel';

export const CartProducts = () => {
  const dispatch = useDispatch();

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

        <Row className="categoryContainer">
           {
           loading&& 
           <ClipLoader size="60" color="var(--main-red)" cssOverride={override} />
           }
            
        {currentproduct !== undefined && currentproduct.map((product) => (
              <Col key={product.id} className="categoryCard"> 
                
               <Row>
                  <img src={product.productImage} className="categoryimg" alt={product.productName} /> 
                </Row>
                 <Row>
                    <h4 className="categoryName">{product.productName}</h4>
                    <p>$ {product.productPrice}</p>
                    <span>On hand - {product.stockQuantity}</span>
                    <span>{product.stockQuantity!==0?"Available!":"Not Available!"}</span>
                </Row>
                <Row className="add-product-cart">
                      {product.stockQuantity === 0 ? (
                        <div className="cart-stock">Out Of Stock</div>
                      ) : (
                        <button
                          className="add-cart"
                          type="submit"
                          onClick={() => {
                            addCart(product);
                          }}
                        >
                          Add Cart
                        </button>
                      )}
                  </Row>

              </Col>
            ))} 
    
        
         
        </Row>
      
      </Container>

  );
}
