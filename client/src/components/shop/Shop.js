import React from "react";
import { Container, Col, Row } from "reactstrap";
import Refine from "./Refine";
import CardBlocks from "./CardBlocks";

const Shop = () => {
  return (
    <Container>
      <h1 className="display-3 my-5 ">Shoes !</h1>
      <Row>
        <Col sm="3">
          <Refine />
        </Col>
        <Col sm="9">
          <CardBlocks />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
