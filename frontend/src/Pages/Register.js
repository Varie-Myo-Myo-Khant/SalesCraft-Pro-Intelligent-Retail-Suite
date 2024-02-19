import React, { useState, useEffect } from 'react'
import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../Slice/authSlice'
import '../Styles/login_register.css';

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
      navigate('/')
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
    navigate('/')
  }

  return (
      <section className='home'>
     
          <Container>
            <Row className='homeRow'>
              <Col className='homeTitle'>
                  <h4>Intelligent Retail Suite</h4>
            <h1>SalesCraft Pro</h1> 
            <p>Streamline your point-of-sale tasks with our user-friendly interface and access comprehensive retail management features. Unlock high-level sales reports and real-time sales data for informed decision-making, driving your business forward.</p>
              </Col>
              <Col className='homeLoginForm'>
                <div className='formbgn'>
                <h3>Register</h3>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Username</Form.Label> 
                      <Form.Control  className='myinput'
                      type="text" 
                      placeholder='Username' 
                      name='username' 
                      value={username} 
                      onChange={onChange} />  
                     </Form.Group>
              
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className='myinput'
                    type="email" 
                    placeholder='Email' 
                    name='email' 
                    value={email} 
                    onChange={onChange} />  
                  </Form.Group>   
                        
                        
                     <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>  
                        <Form.Control  className='myinput'
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
                      Already have an account? <span className='subText'><Link to="/">Log in here!</Link></span>
                  </div>
                </Col>
                
                </Row>
                </Container>
                </section>
    
  );
}

