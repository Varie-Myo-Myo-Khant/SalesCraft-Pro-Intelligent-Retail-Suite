import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  

  const {user} = useSelector((state) => state.auth);
     
  if (user){
    return children
  } 
  if (!user){
    // toast.error("Please login or register first.")
    return <Navigate to="/" />;
  }
  
};

