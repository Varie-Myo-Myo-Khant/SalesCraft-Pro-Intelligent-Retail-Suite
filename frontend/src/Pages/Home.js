import {Row,Col} from 'react-bootstrap';
import '../Styles/login_register.css';
import {Link } from "react-router-dom";
import videoBanner from "../Images/homebgn.mp4"
import logo from "../Images/homelogo.svg"
export const Home=()=>{
   
 
   return (
    <section className='home'>
     
  
      <Row className='homeRow'>
        <Col xs={12} lg={4} className='homeTitle'>
            <Row className='logoSection'>
               <img src={logo} alt='brandlogo'className='mylogo'/>
            </Row>
            <Row className='titleSection'>
            
            <h1>SalesCraft Pro</h1> 
            <h4>Intelligent Retail Suite</h4>
            <p>Streamline your point-of-sale tasks with our user-friendly interface and access comprehensive retail management features. Unlock high-level sales reports and real-time sales data for informed decision-making, driving your business forward.</p>
            </Row>
            <Row className='Btn'>
              <Link className='homeBtn1'  to="login">Login</Link>
               
               <Link className='homeBtn2'  to="register">Register</Link>
            </Row>
        </Col>
        <Col xs={12} lg={8} className='videoHolder'> 
          <div className='VideoComponent'>
            <video poster={videoBanner} preload="metadata" playsInline autoPlay loop muted>
               <source src={videoBanner} type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         </div>
         </Col>
      </Row>
    
    </section>
    );
}