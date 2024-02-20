import {Row,Col} from "react-bootstrap";
import { CheckOutContent } from "./CheckOutContent";
import { CheckOutPayment } from "./CheckOutPayment";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Checkout = () => {

  return (
    <>
    <Row>
        <Col md="auto" className="Goback">
          <Link to="/order">
            <FaArrowAltCircleLeft className="menu-icon" />
            Go back to Order Page
          </Link>
        </Col>
      </Row>

          <Row className="CheckoutContainer">
       <CheckOutContent/>
        <CheckOutPayment/>
      </Row>
    </>
  );
};
