import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductDetail } from "../../redux/actions/product_actions";
import { Container, Row, Col } from "reactstrap";
import ProductImg from "./ProductImg";
import ProductInformation from "./ProductInformation";
import SpinnerIcon from "../common/SpinnerIcon";

class Product extends Component {
  state = { modalIsOpen: false };

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };

  componentDidMount() {
    this.props.getProductDetail(this.props.match.params.id);
  }

  render() {
    // console.log(this.props.products);
    const { products } = this.props;

    return (
      <Container className="my-5">
        <Row>
          <Col sm="6">
            {products.loading ? (
              <SpinnerIcon />
            ) : (
              <ProductImg
                product={products.product}
                loading={products.loading}
                success={products.success}
              />
            )}
          </Col>
          <Col sm="6">
            <ProductInformation
              product={products.product}
              loading={products.loading}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getProductDetail }
)(Product);
