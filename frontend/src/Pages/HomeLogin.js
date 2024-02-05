import {Container,Form,Button,Row,Col} from 'react-bootstrap';


import '../Styles/Home.css';


export const HomeLogin=()=>{
   
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
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
                </Form>
            </div>
            <div className='newUserBgn'>
                <a>New User? <span className='subText'>Create an account!</span></a> 
            </div>

         </Col>
      </Row>
    </Container>
    </section>
    );
}