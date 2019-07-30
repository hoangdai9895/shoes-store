import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import { connect } from "react-redux";
class ManageProduct extends Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    if (!props.auth.isAdmin) {
      props.history.push("/login");
      return true;
    }
    return null;
  }
  render() {
    return (
      <Userlayout>
        <h2 className="title"> Manage Product </h2> <hr />
        <p> You can mange your products here!!! </p>
        <Link
          to="/admin/add-product"
          className="btn btn-primary"
          style={{ marginBottom: "1rem" }}
        >
          Add Product
          <img
            src="/img/plus.png"
            alt="plus"
            style={{
              width: "20px",
              verticalAlign: "sub",
              margin: "0 0 0 10px"
            }}
          />
        </Link>
        <hr />
        <ProductList />
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ManageProduct);
