import React, { useState, useEffect } from 'react'
import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../Slice/authSlice'
import '../Styles/Home.css';

export const Register = () => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const { username, email, password } = form

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, success, error, message } = useSelector(state => state.auth)
  
  useEffect(() => {
    if (error) {
      toast.error(message)
    }
    if (success || user) {
      navigate('/login')
    }
    dispatch(reset())
  }, [error, success, user, message, navigate, dispatch])

  const onChange = (e) => {
    setForm({  ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   
    const userData = {
      username, email, password
    }
    dispatch(register(userData))
    navigate('/login')
  }

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
                      placeholder='Username' 
                      name='username' 
                      value={username} 
                      onChange={onChange} />  
                     </Form.Group>
              
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder='Email' 
                    name='email' 
                    value={email} 
                    onChange={onChange} />  
                  </Form.Group>   
                        
                        
                     <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>  
                        <Form.Control  
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        value={password} 
                        onChange={onChange} />  
                      </Form.Group>

                    <Button variant="primary" type="submit">Register</Button>
                    
                
                </Form>
                    
                </div>
                <div className='newUserBgn'>
                      <a>Already have an account? <span className='subText'><Link to="/">Log in here!</Link></span></a> 
                  </div>
                </Col>
                
                </Row>
                </Container>
                </section>
    
  );
}

