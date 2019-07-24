import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
class ManageProduct extends Component {
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

export default ManageProduct;