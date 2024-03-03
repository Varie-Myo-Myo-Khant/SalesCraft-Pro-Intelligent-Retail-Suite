import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch, FaTimes} from "react-icons/fa";
import { Form,Modal,Button,  Row, Col } from 'react-bootstrap';
import { clearValues, getCategories } from "../Slice/categorySlice";
import { getProducts,searchByProductName,categoryProductFilter } from "../Slice/productSlice";
import "../Styles/product_category.css";
import { addToCart } from "../Slice/cartSlice";
import ReactSimplyCarousel from 'react-simply-carousel';
import { Loading } from "./Loading"; 
import { updateSession} from '../Slice/sessionSlice';
import { useNavigate  } from 'react-router-dom';
import "../Styles/cartproduct.css"
export const CartProducts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //for carousel
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  //for products data
  const { products,loading,filterProduct} = useSelector((state) => state.product);   
   //for search query
  const [searchQuery, setSearchQuery] = useState(""); 

  //for user filtering
  const { user } = useSelector((store) => store.auth);

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

  //for sessions close
  const [showCloseModal, setShowCloseModal] = useState(false);
  const { sessionId } = useSelector((state) => state.session);
  const [closingCash, setClosingCash] = useState(0);

  //for cateogry data
  function capitalizeAndReplace(str) {
    return str
        .split('-') // Split the string by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words with space
}


  const handleCloseSessionSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSession({sessionId ,session: {closingCash: parseFloat(closingCash)} }))
      .then(() => {
        handleCloseModalClose();
        clearValues();
        navigate('/session'); 
      })
      .catch((error) => {
        console.error('Error closing session:', error);
      });
  };

   const modalInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'closingCash') {
      setClosingCash(value);
    }
  };

   const handleCloseSession = () => {
    setShowCloseModal(true);
  };
  const handleCloseModalClose = () => {
    setShowCloseModal(false);
  };
  return (
   
      <>
        <Row className="orderSearchContainer"> 
            <Col className="search-wrapper">
              <FaSearch className="osearch-icon" />
              <input
                type="text" 
                className="keywordsearch ordersearch form-control"
                placeholder="Search by Product Name"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && <FaTimes className="oclear-icon" onClick={removequery} />}
            </Col>
           
          <Col md="auto">
          <Button className="closeBtn" onClick={handleCloseSession}>Close Session</Button>
           <Modal show={showCloseModal} onHide={handleCloseModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Close Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCloseSessionSubmit}>
            <Form.Group controlId="closingCash">
              <Form.Label className='modalLabel'>Enter Closing Cash</Form.Label>
              <Form.Control type="number" name='closingCash' value={closingCash} onChange={modalInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Close Session</Button>
          </Form>
        </Modal.Body>
      </Modal>
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
                  {minWidth: 1000, itemsToShow: 6}, 
                  {minWidth: 768, maxWidth: 1000, itemsToShow: 4}, 
                  {maxWidth: 767, itemsToShow: 3}
                ]}
                speed={400}
                easing="linear"
              >
          
              {categories !== undefined && categories.some(category => category.userId === user.id) && (
                <a className="smallcategory" type="button" onClick={() => setCurrentProduct(products)}>  
                  All
                </a>
              )}
              
              {categories !== undefined && categories.map((category) => (
                (category.userId === user.id ) && (
                  <a className="smallcategory" type="button" key={category.id} onClick={()=>filtering(category.category)}>  
                     {capitalizeAndReplace(category.category)}  
                </a>)
                ))} 
            </ReactSimplyCarousel>
        </Row>

        <Row className="orderproductContainer">
        {loading&&<Loading loading={loading}/>}
        {currentproduct !== undefined && currentproduct.map((product) => (
              (product.userId === user.id ) && (
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
                ))
             
            ))} 
    
        
         
        </Row>
      
      </>

  );
}
