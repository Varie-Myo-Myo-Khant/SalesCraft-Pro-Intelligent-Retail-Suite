import React, {useRef} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Container, Form, Button, Row ,Col} from 'react-bootstrap';
import { categoryCreate, handleChange, clearValues, editCategory } from "../Slice/categorySlice"; 
import { toast } from "react-toastify"; 
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../Styles/addform.css"  
import { useNavigate } from 'react-router-dom';

export const AddCategory = () => {
  const navigate = useNavigate();
  
  const { user } = useSelector((store) => store.auth);
  const { category,categoryImage,isEditing,editCategoryId} = useSelector((store) => store.category);
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
    if (!category) {
      toast.error("Category name is required");
      return;
    }  

    //checking isEditing state and calling edit category slice
  if(isEditing){
    dispatch(editCategory({
      product:{id:editCategoryId,category,categoryImage,userId:user.id},
      }
    ))
    dispatch(clearValues());
    return;
  }

  //if not edit continue with creating category.
    dispatch(categoryCreate({ category, categoryImage, userId: user.id }))
      .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Successfully Added New Category!");

        // Reset file input value to clear the selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input value
        }
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to Add New Category. Please Try Again!");
      });
       dispatch(clearValues());
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
      <Col md="auto"  className="Goback">
     <Link to="/category">
              <FaArrowAltCircleLeft className="menu-icon" />
              Go back to Category Page
            </Link>
      </Col>      
    </Row>
      <Row className="Addform" >
        <h3>{isEditing?"Update Category" : "Add New Category"}</h3>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Category Image"
              name="image"
              accept="image/*"
              onChange={convertToBase64}
              ref={fileInputRef} // Attach ref to the file input field
            /> 
          </Form.Group> 
          <Button variant="primary" className="btntype2" type="submit">{isEditing?"Update Category":"Add Category"}</Button>
          <Button variant="primary" className="btntype1"  onClick={() => navigate('/category')}>Cancel</Button>
        </Form> 
      </Row>
       
    </Container>
   
  );
};
