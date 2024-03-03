import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import '../Styles/login_register.css';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../Slice/authSlice";
import logo from "../Images/homelogo.svg"

export const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, user, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (success || user) {
      navigate("/dashboard", { replace: true });
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
  };
 
  return (
    <section className='loginformPage'>
      <Container>
        <Row className='logoSection formRow'>
          <Link to="/">
            <img src={logo} alt='brandlogo'className='mylogo'/>
          </Link>
        </Row>
        <Row className='mainFormSection'>
          <Col className='homeLoginForm' xs={12} md={{ span: 6, offset: 5 }}>
            <div className='formbgn'>
              <h3>Login</h3>
              <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className='myinput'
                    type="text"
                    name='username'
                    value={username}
                    onChange={onChange}
                    placeholder="Enter Username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className='myinput'
                    value={password}
                    onChange={onChange}
                  />
                </Form.Group>
                
                <Button variant="primary" className="loginBtn" type="submit">
                  Login
                </Button>
              </Form>
            </div>
            <div className='newUserBgn'>
              New User? <span className='subText'><Link to="/register">Register Here!</Link></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
