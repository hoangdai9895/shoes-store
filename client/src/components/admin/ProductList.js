import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProdcuct,
  deleteProduct
} from "../../redux/actions/product_actions";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import SpinnerIcon from "../common/SpinnerIcon";
class ProductList extends Component {
  deleteProduct = product => {
    if (window.confirm("Are you sure ???")) {
      let listImages = [];
      for (let key in product.images) {
        listImages.push(product.images[key].public_id);
      }
      this.props.deleteProduct(product._id, listImages);
    }
  };

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
            <img
              src={item.images[0] ? item.images[0].url : "/img/nophoto.png"}
              alt=""
            />
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
            <Link
              to={`/admin/update-product/${item._id}`}
              className="btn btn-primary mr-2"
            >
              Update
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteProduct(item)}
            >
              Remove
            </button>
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
        <div className="mb-3">
          {products.loading ? (
            <span>
              <SpinnerIcon type="3grow" />
            </span>
          ) : products.size > 0 ? (
            `${products.size} Products`
          ) : (
            `${products.size} Product`
          )}
        </div>
        <Table responsive>
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
  { getAllProdcuct, deleteProduct }
)(ProductList);
