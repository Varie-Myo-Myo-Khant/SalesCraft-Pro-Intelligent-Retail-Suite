import React, { useState, useEffect } from 'react'
import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../Slice/authSlice'
import '../Styles/login_register.css';
import logo from "../Images/homelogo.svg"

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
      <section className='registerformPage'>
     
          <Container>
             <Row className='logoSection formRow'>
                <Link to="/"> <img src={logo} alt='brandlogo'className='mylogo'/></Link>
             </Row>
            <Row className='mainFormSection'>
              <Col className='homeLoginForm' xs={12} md={{ span: 6, offset: 5 }}>
                <div className='formbgn'>
                <h3>Register</h3>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <Form.Group className="registerInput" controlId="formBasicEmail">
                     <Form.Label>Username</Form.Label> 
                      <Form.Control  className='myinput'
                      type="text" 
                      placeholder='Username' 
                      name='username' 
                      value={username} 
                      onChange={onChange} />  
                     </Form.Group>
              
                  <Form.Group  className="registerInput" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className='myinput'
                    type="email" 
                    placeholder='Email' 
                    name='email' 
                    value={email} 
                    onChange={onChange} />  
                  </Form.Group>   
                        
                        
                     <Form.Group className="registerInput" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>  
                        <Form.Control  className='myinput'
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        value={password} 
                        onChange={onChange} />  
                      </Form.Group>

                    <Button variant="primary" className="loginBtn" type="submit">Register</Button>
                    
                
                </Form>
                    
                </div>
                <div className='newUserBgn'>
                      Already have an account? <span className='subText'><Link to="/login">Log in here!</Link></span>
                  </div>
                </Col>
                
                </Row>
                </Container>
                </section>
    
  );
}

