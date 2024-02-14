import React from 'react';
import { BrowserRouter as Router,Link, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import {Register} from './Pages/Register';
import AddCategory from './Pages/AddCategory';
import {HomeLogin} from './Pages/HomeLogin'; 
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
  
      <div className="App">
          <Router>
        <Routes>
           <Route path='/' element={<HomeLogin/>} /> 
          <Route path='/register' element={<Register />} />
           <Route path='/category' element={<AddCategory />} />

           
          </Routes>     
          </Router>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
