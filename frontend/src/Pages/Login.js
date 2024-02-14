import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import '../Styles/home.css';
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../Slice/authSlice";


export const Login=()=>{

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  console.log(form);

  const { username, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, success, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (success || user) {
      navigate("/homedashboard");
    }
    dispatch(reset());
  }, [error, success, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };
   
    dispatch(login(userData));
    navigate('/homedashboard')
  };
 
   return (
    <section className='home'>
     
   <Container>
      <Row className='homeRow'>
        <Col className='homeTitle'>
            <h1>SalesCraft Pro</h1>
            <h4>Intelligent Retail Suite</h4>
        </Col>
        <Col className='homeLoginForm'>
            <div className='formbgn'>
            <h3>Login</h3>
              <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    name='username'
                    value={username}
                    onChange={onChange}
                    placeholder="Enter Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
                </Form>
            </div>
            <div className='newUserBgn'>
                New User? <span className='subText'><Link to="/register">Create an account!</Link></span>
            </div>

         </Col>
      </Row>
    </Container>
    </section>
    );
}