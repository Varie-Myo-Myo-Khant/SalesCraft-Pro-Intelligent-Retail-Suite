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
import {ContentContainer} from './Pages/ContentContainer';
import {PrivateRoute} from './Pages/PrivateRoute';
import { CategoryMainPage } from './Pages/CategoryMainPage';
import { Order } from './Pages/Order';
import { Report } from './Pages/Report';
import { Notfound } from './Pages/Notfound';
import { History } from './Pages/History';
import {Session} from './Pages/Session';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';

function App() {
  return (
    <>
  
      <div>
        <Router>
        <Routes>
          <Route path='/' element={<Home />} name="home" /> 
          <Route path='/login' element={<Login />} name="login" /> 
            <Route path='/register' element={<Register />} name="register" />
            
            <Route path='/' element={
              <PrivateRoute>
                <ContentContainer />
              </PrivateRoute>
            } name="contentcontainer">
              <Route path='dashboard' element={<Report />} name="dashboard" />
              <Route path='product' element={<ProductMainPage />} name="product" />
              <Route path='category' element={<CategoryMainPage />} name="category" />
              <Route path='addproduct' element={<AddProduct />} name="addproduct" />
              <Route path='addcategory' element={<AddCategory />} name="addcategory" />
              <Route path='session' element={<Session />} name="session" />
              <Route path='history' element={<History />} name="history" />
              <Route path='order' element={<Order />} name="order" />
              <Route path='profile' element={<Profile />} name="profile" />
               
          </Route>  
          <Route path='*' element={<Notfound />}/>
          </Routes>     
          </Router>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
