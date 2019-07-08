import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";
import CollapseBlock from "./CollapseBlock";
import { getBrands } from "../../redux/actions/brands_actions";
import {
  getAllProdcuct,
  getProductFilter,
  getFilter
} from "../../redux/actions/product_actions";
import { connect } from "react-redux";
class Refine extends Component {
  state = {
    limit: 6,
    filters: {
      brand: [],
      type: [],
      price: []
    }
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  componentDidMount() {
    this.props.getBrands();
  }

  handlePriceFilter = value => {
    const data = value;
    let array = [];
    for (let key in array) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  checkProperties = obj => {
    for (let key in obj) {
      if (obj[key] === "") {
        return false;
      }
      return true;
    }
  };

  handleFilter = (filters, category) => {
    // console.log(filters);
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters ? filters : "";
    if (category === "price") {
      let priceValue = this.handlePriceFilter(filters);
      newFilters[category] = priceValue;
    }
    // console.log(newFilters);
    // get all product filter
    this.props.getProductFilter(0, this.state.limit, newFilters);
    this.setState({
      filters: newFilters
    });
  };

  render() {
    // console.log(this.state.filters);
    const { brands } = this.props;
    return (
      <>
        <ListGroupItem className="font-weight-bold ">REFINE</ListGroupItem>
        <CollapseBlock
          brands={brands}
          type="Brands"
          handleFilter={filters => this.handleFilter(filters, "brand")}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  brands: state.brands
});

export default connect(
  mapStateToProps,
  { getBrands, getAllProdcuct, getProductFilter, getFilter }
)(Refine);
