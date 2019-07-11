import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";
import CollapseBlock from "./CollapseBlock";
import { getBrands } from "../../redux/actions/brands_actions";
import { getAllType } from "../../redux/actions/type_actions";
import { getProductFilter } from "../../redux/actions/product_actions";
import { connect } from "react-redux";

import { price } from "../common/categories";
import CollapseRadio from "./CollapseRadio";
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
    this.props.getAllType();
  }

  handlePriceFilter = value => {
    // console.log(typeof value);
    const data = price.list;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilter = (filters, category) => {
    // console.log(filters);
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValue = this.handlePriceFilter(filters);
      newFilters[category] = priceValue;
    }
    console.log(newFilters);
    // get all product filter
    this.props.getProductFilter(0, this.state.limit, newFilters);
    this.setState({
      filters: newFilters
    });
  };

  render() {
    // console.log(this.state.filters);
    const { brands, type } = this.props;
    return (
      <>
        <ListGroupItem className="font-weight-bold "> REFINE </ListGroupItem>
        <CollapseBlock
          field={brands}
          type="Brands"
          handleFilter={filters => this.handleFilter(filters, "brand")}
        />
        <CollapseBlock
          field={type}
          type="Type"
          handleFilter={filters => this.handleFilter(filters, "type")}
        />
        <CollapseRadio
          field={price}
          type="Price"
          handleFilter={filters => this.handleFilter(filters, "price")}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  brands: state.brands,
  type: state.type
});

export default connect(
  mapStateToProps,
  { getBrands, getProductFilter, getAllType }
)(Refine);
