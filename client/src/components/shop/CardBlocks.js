import React, { Component } from "react";
import { Row } from "reactstrap";
import CardItem from "../common/CardItem";
import { connect } from "react-redux";
import {
  getAllProdcuct,
  getProductFilter
} from "../../redux/actions/product_actions";
import SpinnerIcon from "../common/SpinnerIcon";

class CardBlocks extends Component {
  componentDidMount() {
    // this.props.getAllProdcuct();
    this.props.getProductFilter(0, 6, {});
  }

  generateCardItem = products => {
    if (products.loading) return <SpinnerIcon />;
    if (products.size === 0)
      return <div className="no_result">Sorry, no results</div>;
    return products.products.map((item, i) => <CardItem item={item} key={i} />);
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <Row>{this.generateCardItem(products)}</Row>
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
