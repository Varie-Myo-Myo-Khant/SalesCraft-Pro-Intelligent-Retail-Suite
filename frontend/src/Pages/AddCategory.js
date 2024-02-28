import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { categoryCreate, handleChange, clearValues, editCategory } from "../Slice/categorySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../Styles/addform.css"

import { useNavigate } from 'react-router-dom';

export const AddCategory = () => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);
  const { category, categoryImage, isEditing, editCategoryId } = useSelector((store) => store.category);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null); // Create a ref for the file input field

  // Handle converting image to base64
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dispatch(handleChange({ name: 'categoryImage', value: reader.result }));
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }

  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !categoryImage) {
      toast.error("An error occurred while updating the category!");
      return;
    }
   
    // Check if isEditing, dispatch editCategory
    if (isEditing) {
     
      dispatch(editCategory({editCategoryId,category:{category,categoryImage,userId: user.id}}))
       .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Successfully updated the category!");

        // Reset file input value to clear the selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input value
        }
      })
      .catch(() => {
        // Handle error
        toast.error("Failed to update the category. Please try again!");
      });
    }

    else{
      // Continue with creating category
    dispatch(categoryCreate({ category, categoryImage, userId: user.id }))
      .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Successfully added new category!");

        // Reset file input value to clear the selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input value
        }
      })
      .catch(() => {
        // Handle error
        toast.error("Failed to add new category. Please try again!");
      });

    }
      navigate("/category")
  };

  // Handle input change
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    dispatch(handleChange({ name, value }));
  };


  return (

    <Container className="formcontainer">
      <Row>
        <Col md="auto" className="Goback">
          <Link to="/category">
            <FaArrowAltCircleLeft className="menu-icon" />
            Go back to Category Page
          </Link>
        </Col>
      </Row>
      <Row className="Addform" >
        <h3>{isEditing ? "Update Category" : "Add New Category"}</h3>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Category"
              name="category"
              value={category}
              onChange={onChange}
            />
          </Form.Group>
          <Row className="addImage">
            
          {categoryImage && (<Col md="auto">
                <img src={categoryImage} alt="Category Image" className="addsmallimage" /></Col> 
            )}  
          <Form.Group  as={Col} className="mb-3 " controlId="formBasicEmail">
            
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              placeholder={categoryImage ? "Update Image" : "Category Image"}
              name="image"
              accept="image/*"
              onChange={convertToBase64}
              ref={fileInputRef} // Attach ref to the file input field
            />
           
             
          </Form.Group>
          
            </Row>
          <Row>
            <Button variant="primary" className="btntype2" type="submit">{isEditing ? "Update Category" : "Add Category"}</Button>
            <Button variant="primary" className="btntype1" onClick={() => navigate('/category')}>Cancel</Button>
          </Row>
        </Form>
      </Row>

    </Container>

  );
};
