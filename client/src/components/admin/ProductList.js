import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProdcuct } from "../../redux/actions/product_actions";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import SpinnerIcon from "../common/SpinnerIcon";
class ProductList extends Component {
  generateProductList = (products, loading) => {
    if (loading)
      return (
        <tr>
          <td colSpan="5">
            <SpinnerIcon />
          </td>
        </tr>
      );
    return products.map((item, i) => (
      <tr key={i}>
        <th>{i++}</th>
        <td>
          <div className="img-list-product">
            <img src={item.images[0].url} alt="" />
          </div>
        </td>
        <td>
          <Link to={`/shop/${item._id}`} className="name-product-list-item">
            {item.name}
          </Link>
        </td>
        <td>$ {item.price}</td>
        <td>
          <div className="d-flex">
            <Link to="/admin/update-product" className="btn btn-primary mr-2">
              Update
            </Link>
            <button className="btn btn-danger">Remove</button>
          </div>
        </td>
      </tr>
    ));
  };

  componentDidMount() {
    this.props.getAllProdcuct();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <div className="mb-3"> 63 Products </div>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Preview</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.generateProductList(products.products, products.loading)}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getAllProdcuct }
)(ProductList);
