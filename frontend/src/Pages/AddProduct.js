import React, {useRef,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Container, Form, Button, Row ,Col} from 'react-bootstrap';
import { productCreate, handleChange, clearValues, editProduct } from "../Slice/productSlice"; 
import { toast } from "react-toastify"; 
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {getCategories} from '../Slice/categorySlice';
import "../Styles/addform.css"  

export const AddProduct = () => {
  const { user } = useSelector((store) => store.auth);
  const { 
    productName,
    productImage,
    productPrice,
    stockQuantity,
    category,
    isEditing,
    editProductId} = useSelector((store) => store.product);

  //get category to use in the Selection
  const { categories } = useSelector((store) => store.category);  
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const fileInputRef = useRef(null); // Create a ref for the file input field

  
  // Handle converting image to base64 
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dispatch(handleChange({ name: 'productImage', value: reader.result }));
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    }; 
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //check input
    if (!productName || !productImage || !productPrice || !stockQuantity) {
      toast.error("An error occurred while updating the product!");
      return;
    }  

  //checking isEditing state and calling editproduct slice
  if(isEditing){
    dispatch(editProduct({
      product:{id:editProductId,productName,productImage,productPrice,stockQuantity,category,userId:user.id},
      }
    ))
    dispatch(clearValues());
    return;
  }

  //if not edit continue with creating product.
    dispatch(productCreate({ productName, productImage,productPrice,stockQuantity,category, userId: user.id }))
      .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Successfully Added New Product!");

        // Reset file input value to clear the selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input value
        }
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to Add New Product. Please Try Again!");
      }); dispatch(clearValues());
     

  };

  // Handle input change
  const onChange = (e) => { 
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  
  return (
  
    <Container className="formcontainer">
    <Row>
      <Col md="auto"  className="Goback">
     <Link to="/product">
              <FaArrowAltCircleLeft className="menu-icon" />
              Go back to Product Page
            </Link>
      </Col>      
    </Row>
      <Row className="Addform" >
        <h3>{isEditing?"Update Product" : "Add New Product"}</h3>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label> 
            <Form.Control
              type="text"
              placeholder="Product"
              name="productName"
              value={productName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Category Image"
              name="image"
              accept="image/*"
              onChange={convertToBase64}
              ref={fileInputRef} // Attach ref to the file input field
            /> 
             </Form.Group> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Price</Form.Label> 
            <Form.Control
              type="text"
              placeholder="Product"
              name="productPrice"
              value={productPrice}
              onChange={onChange}
            />
          </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Stock Quantity</Form.Label> 
            <Form.Control
              type="text"
              placeholder="Stock Quantity"
              name="stockQuantity"
              value={stockQuantity}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label> 
            <Form.Select  
              name="category"
              value={category}
              onChange={onChange}
            >
              <option value="Select Category">Select Category</option>
              {categories.map((c)=>(
                <option key={c.id} value={c.category}>{c.category}</option>
              ))}
              </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">{isEditing?"Update Product":"Add Product"}</Button>
        </Form> 
      </Row>
       
    </Container>
   
  );
};
