import React, { Component } from "react";
import { Row, Container } from "reactstrap";
import CardItem from "../common/CardItem";
import { connect } from "react-redux";
import {
  getAllProdcuct,
  getProductFilter
} from "../../redux/actions/product_actions";
import SpinnerIcon from "../common/SpinnerIcon";
import NoResult from "../common/NoResult";

class CardBlocks extends Component {
  state = {
    limit: 6,
    skip: 0
  };
  componentDidMount() {
    // this.props.getAllProdcuct();
    this.props.getProductFilter(this.state.skip, this.state.limit, {});
  }

  generateCardItem = products => {
    if (products.loading) return <SpinnerIcon />;
    if (products.size === 0) return <NoResult />;
    return products.products.map((item, i) => <CardItem item={item} key={i} />);
  };

  loadmoreCardItem = () => {
    let skip = this.state.skip + this.state.limit;
    this.props.getProductFilter(skip, this.state.limit, {});
    this.setState({ skip });
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <Row>{this.generateCardItem(products)}</Row>

        {products.size > 0 && products.size >= this.state.limit ? (
          <Container style={{ textAlign: "center" }}>
            <button
              className="btn btn-outline-secondary mx-auto"
              onClick={() => this.loadmoreCardItem()}
            >
              LOAD MORE
            </button>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getAllProdcuct, getProductFilter }
)(CardBlocks);
