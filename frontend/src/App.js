import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import { AddCategory } from './Pages/AddCategory';
import { AddProduct } from './Pages/AddProduct';
import {Register} from './Pages/Register';
import { ProductMainPage } from './Pages/ProductMainPage';
import {Login} from './Pages/Login'; 
import {HomeDashboard} from './Pages/HomeDashboard';
import {PrivateRoute} from './Pages/PrivateRoute';
import { CategoryMainPage } from './Pages/CategoryMainPage';
import { Order } from './Pages/Order';
function App() {
  return (
    <>
  
      <div>
        <Router>
        <Routes>
          <Route path='/' element={<Login />} name="login" /> 
            <Route path='/register' element={<Register />} name="register" />
            
            <Route path='/dashboard' element={
              <PrivateRoute>
                <HomeDashboard />
              </PrivateRoute>
            } name="dashboard">
              <Route path='product' element={<ProductMainPage />} name="product" />
              <Route path='category' element={<CategoryMainPage />} name="category" />
              <Route path='addproduct' element={<AddProduct />} name="addproduct" />
              <Route path='addcategory' element={<AddCategory />} name="addcategory" />
              <Route path='order' element={<Order />} name="order" />
               {/* <Route path='history' element={<AddCategory />} name="history" /> */}
          </Route>  
          </Routes>     
          </Router>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
