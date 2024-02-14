import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import {
  categoryCreate,
  handleChange,
  clearValues,
} from "../Slice/categorySlice";
import { logout, reset } from "../Slice/authSlice";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import authHeader from '../Services/AuthHeader';
const AddCategory = () => {
  const { user } = useSelector((state) => state.auth);
  const { categoryImage,category } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace Redirect with useNavigate

  // Logout user
  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/"); // Use navigate instead of Redirect
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Category name is required");
      return;
    }

    // Ensure user is authenticated
    if (!user) {
      toast.error("Please login to add a category");
      return;
    }
     const categoryData = {
      category,
      userId: user.id,
    };
    // Dispatch category create action with authentication token
    const config = authHeader()
    console.log(categoryData,config)
    dispatch(categoryCreate(categoryData, config))
      .then(() => {
        // Clear form values after successful submission
        dispatch(clearValues());
        toast.success("Category added successfully");
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to add category");
      });
  };

  // Handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  return (
    <>
      {/* Logout button */}
      <button className="logout-btn" onClick={logoutUser}>
        <FaSignInAlt className="logout-icon" />
      </button>

      {/* Add category form */}
      <div className="form-container">
        <form className="form category-form" onSubmit={handleSubmit}>
          <div className="add-form">
            <h1 className="new-product">Add Category</h1>
          </div>
           
          <div className="form-input">
            <input
              type="name"
              placeholder="Category Image"
              
              name="category"
              value={category}
              onChange={onChange}
            />
          </div>
          <div className="form-input">
            <button className="product-btn">Add Category</button>
          </div>
        </form>
        <AddProduct/>
      </div>
    </>
  );
};

export default AddCategory;