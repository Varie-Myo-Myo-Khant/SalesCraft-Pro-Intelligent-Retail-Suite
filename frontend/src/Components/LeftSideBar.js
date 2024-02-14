import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaHome,
  FaShoppingCart,
  FaShopify,
  FaUserCircle,
  FaSignInAlt,
  FaWpforms,
} from "react-icons/fa";

 
const LeftSideBar = () => {
  
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const logoutUser = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate("/");
//   };

  return (
    <>
      <div className="menu-links">
        <Link to="/dashboard">
          <FaHome className="menu-icon" />
          Home
        </Link>
        <Link to="/dashboard/orders">
          <FaShopify className="menu-icon" />
          Orders
        </Link>
        <Link to="/dashboard/form">
          <FaWpforms className="menu-icon" />
          Form
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="menu-icon" />
          Cart
        </Link>
      </div>

      <div className="user-info">
        <div className="user-detail">
          <FaUserCircle className="user-icon" />
          <span className="user">{user.name}</span>
        </div>
        <button className="logout-btn"  >
          <FaSignInAlt className="logout-icon" />
        </button>
      </div>
    </>
  );
};

export default LeftSideBar;
