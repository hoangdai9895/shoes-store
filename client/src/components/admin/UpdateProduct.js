import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Userlayout from "../layout/Userlayout";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import SpinnerIcon from "../common/SpinnerIcon";
import FileUpdate from "../common/FileUpdate";
import { getAllType } from "../../redux/actions/type_actions";
import { getBrands } from "../../redux/actions/brands_actions";
import {
  getProductDetail,
  updateProduct
} from "../../redux/actions/product_actions";
class UpdateProduct extends Component {
  state = {
    formErr: {},
    name: null,
    description: null,
    price: null,
    brand: null,
    type: null,
    images: [],
    updateSuccess: false,
    loadProduct: false
  };

  generateOption = (data, loading, type) => {
    if (loading) return <SpinnerIcon />;
    return (
      <select name={type} onChange={e => this.onChange(e)} required>
        <option value="default">{`Choose ${type} ...`}</option>
        {data.map(item => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  };

  imagesHandler = images => {
    this.setState({ images });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      id: this.props.match.params.id,
      name: this.state.name,
      description: this.state.description,
      brand: this.state.brand,
      type: this.state.type,
      price: this.state.price,
      images: this.state.images
    };

    this.props.updateProduct(data);
    this.setState({ updateSuccess: true });
  };

  componentDidMount() {
    if (this.props.auth.user.role !== 1) {
      this.props.history.push("/shop");
    } else {
      this.props.getAllType();
      this.props.getBrands();
      this.props.getProductDetail(this.props.match.params.id);
    }
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(state.updateSuccess);
    if (!state.loadProduct) {
      return (state = {
        loadProduct: props.products.success,
        name: props.products.product.name,
        description: props.products.product.description,
        price: props.products.product.price,
        brand: props.products.product.brand,
        type: props.products.product.type,
        images: props.products.product.images
      });
    }
    return null;
  }

  render() {
    const { brands, type, products, errors } = this.props;
    const { updateSuccess } = this.state;
    // console.log(this.state);
    if (Object.keys(errors).length !== 0)
      return (
        <Userlayout>
          <img src="/img/no_results.png" alt="" className="w-100" />
        </Userlayout>
      );

    return (
      <Userlayout>
        <h2 className="title"> Update Product </h2> <hr />
        <Form onSubmit={e => this.onSubmit(e)}>
          <FileUpdate
            imagesHandler={e => this.imagesHandler(e)}
            // reset={this.state.updateSuccess}
            success={products.success}
            images={products.product.images}
            // id={this.props.match.params.id}
          />
          <hr />
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name-product"
              placeholder="Product name"
              onChange={e => this.onChange(e)}
              required
              value={this.state.name ? this.state.name : ""}
              // defaultValue={this.state.name}
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Product description"
              onChange={e => this.onChange(e)}
              required
              value={this.state.description ? this.state.description : ""}
            />
          </FormGroup>

          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Product price"
              onChange={e => this.onChange(e)}
              required
              value={this.state.price ? this.state.price : ""}
            />
          </FormGroup>

          <FormGroup className="d-flex justify-content-between">
            <div className="select-form">
              <Label for="brand">Brand</Label>
              {this.generateOption(brands.list, brands.loading, "brand")}
            </div>

            <div className="select-form">
              <Label for="type">Type</Label>
              {this.generateOption(type.list, type.loading, "type")}
            </div>
          </FormGroup>
          <Button
            color="primary"
            className="btn-block"
            // onClick={e => this.onSubmit(e)}
          >
            Update Product
          </Button>
        </Form>
        <hr />
        {products.updateSuccess && updateSuccess ? (
          <Alert color="success">Add Product success</Alert>
        ) : null}
        <Link to="/admin/manage-product" className="btn btn-block btn-info">
          Go back to products page
        </Link>
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  type: state.type,
  brands: state.brands,
  errors: state.errors,
  auth: state.auth,
  products: state.products
});

export default connect(
  mapStateToProps,
  { getAllType, getBrands, getProductDetail, updateProduct }
)(UpdateProduct);
