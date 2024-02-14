import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Link, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 

import {Register} from './Pages/Register';
import { ProductMainPage } from './Pages/ProductMainPage';
import {Login} from './Pages/Login'; 
import {HomeDashboard} from './Pages/HomeDashboard';

function App() {
  return (
    <>
  
      <div>
        <Router>
        <Routes>
          <Route path='/' element={<Login/>} /> 
          <Route path='/register' element={<Register />} />
          <Route path='/homedashboard' element={<HomeDashboard />}>            
            <Route path='product' element={<ProductMainPage />} />
             {/* <Route path='history' element={<AddCategory />} /> */}
          </Route>
           
          </Routes>     
          </Router>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
