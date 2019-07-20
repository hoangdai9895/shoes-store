import React from "react";

import { Jumbotron, Container } from "reactstrap";
import { Link } from "react-router-dom";
const CheckoutSucess = () => {
  return (
    <Container className="my-5">
      <Jumbotron>
        <h1 className="display-3">Thank You!</h1>
        <p className="lead">
          <strong>Please check your email</strong> for further instructions on
          how to complete your account setup.
        </p>
        <hr className="my-2" />
        <p>
          Having trouble? <Link to="/contact">Contact us</Link>
        </p>
        <p className="lead">
          <Link className="btn btn-primary" to="/shop">
            Continue Shopping
          </Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default CheckoutSucess;
