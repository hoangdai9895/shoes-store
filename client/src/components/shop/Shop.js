import React from "react";
import { Container, Col, Row } from "reactstrap";
import Refine from "./Refine";
import CardBlocks from "./CardBlocks";
import { connect } from "react-redux";

const Shop = props => {
  const { products } = props;
  return (
    <Container>
      <h1 className="display-5 my-5 px-3">
        All Products !
        <span style={{ fontSize: "18px", color: "#000", margin: "0 0 0 10px" }}>
          (
          {products.size > 1
            ? products.size + " products"
            : products.size + " product"}{" "}
          )
        </span>
      </h1>
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

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Shop);
