import React from "react";
import { Container, Row, Col } from "reactstrap";
const Footer = () => {
  return (
    <Container fluid className=" mt-4 footer-box p-0">
      <Container className="my-5">
        <Row>
          <Col sm="4">
            <div className="footer">
              <ul>
                <li>
                  Grip meets comfort meets responsiveness. Pulseboost HD is out
                  in the streets.
                </li>
                <li> Ha Noi, Việt Nam </li>
                <li>
                  <a href="mail:hoangdai9895@gmail.com">
                    hoangdai9895 @gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:0796266317"> 0796266317 </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col sm="8">
            <h2 className="footer__title"> Be the first to know </h2>
            <div className="footer__intro">
              Get all information on event, sales and offers.Yan can miss out
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center bg-dark p-3 text-light">
        @2019 - All rights reserved
        <span className="text-danger"> Shoes Store </span>
      </div>
    </Container>
  );
};

export default Footer;
