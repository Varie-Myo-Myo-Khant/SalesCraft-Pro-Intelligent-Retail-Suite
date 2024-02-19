import { Container,  Row, Col } from 'react-bootstrap';
import { CartProducts } from './CartProducts';
import { ShoppingCart } from './ShoppingCart';
import "../Styles/order.css"

export const Order=()=>{
    return(
        <Container  className="ordermainLayout">
            <Row className='orderBase'>
                <Col className='cartproductContainer'>
                <CartProducts/>
                </Col>
                <Col className='cartAmountContainer'>
                <ShoppingCart/>
                </Col>
            </Row>
        </Container>
    )

}