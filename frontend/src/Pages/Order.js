import { Container,  Row, Col } from 'react-bootstrap';
import { CartProducts } from './CartProducts';
import { ShoppingCart } from './ShoppingCart';

export const Order=()=>{
    return(
        <Container>
            <Row>
                <Col>
                <CartProducts/>
                </Col>
                <Col>
                <ShoppingCart/>
                </Col>
            </Row>
        </Container>
    )

}