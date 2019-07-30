import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Alert, Label } from "reactstrap";
import { getAllType } from "../../redux/actions/type_actions";
import { getBrands } from "../../redux/actions/brands_actions";
import { addProduct } from "../../redux/actions/product_actions";
import SpinnerIcon from "../common/SpinnerIcon";
import FileUpload from "../common/FileUpload";
import { Link } from "react-router-dom";
class AddProduct extends Component {
  state = {
    formErr: {},
    name: "",
    description: "",
    price: "",
    brand: "",
    type: "",
    images: [],
    addSuccess: false
  };

  generateOption = (data, loading, type) => {
    if (loading) return <SpinnerIcon />;
    return (
      <select name={type} onChange={e => this.onChange(e)} required>
        <option value="default"> {`Choose ${type} ...`} </option>
        {data.map(item => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, description, brand, type, price, images } = this.state;
    const newProduct = {
      name: name,
      description: description,
      brand: brand,
      type: type,
      price: price,
      images: images
    };
    this.props.addProduct(newProduct);
    this.setState({
      name: "",
      description: "",
      price: "",
      addSuccess: true,
      images: [],
      type: "",
      brand: ""
    });
  };

  imagesHandler = images => {
    this.setState({ images: images });
  };

  componentDidMount() {
    if (this.props.auth.user.role !== 1) {
      this.props.history.push("/shop");
    } else {
      this.props.getAllType();
      this.props.getBrands();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.user.role !== 1) {
      props.history.push("/login");
      return true;
    }
    return null;
  }

  render() {
    const { brands, type, products } = this.props;
    const { addSuccess } = this.state;
    return (
      <Userlayout>
        <h2 className="title"> Add Product </h2> <hr />
        <Form onSubmit={e => this.onSubmit(e)}>
          <FileUpload
            imagesHandler={e => this.imagesHandler(e)}
            reset={this.state.addSuccess}
          />
          <hr />
          <FormGroup>
            <Label for="name"> Name </Label>
            <Input
              type="text"
              name="name"
              id="name-product"
              placeholder="Product name"
              onChange={e => this.onChange(e)}
              required
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description"> Description </Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Product description"
              onChange={e => this.onChange(e)}
              required
              value={this.state.description}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price"> Price </Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Product price"
              onChange={e => this.onChange(e)}
              required
              value={this.state.price}
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-between">
            <div className="select-form">
              <Label for="brand"> Brand </Label>
              {this.generateOption(brands.list, brands.loading, "brand")}
            </div>
            <div className="select-form">
              <Label for="type"> Type </Label>
              {this.generateOption(type.list, type.loading, "type")}
            </div>
          </FormGroup>
          <Button
            color="primary"
            className="btn-block"
            // onClick={e => this.onSubmit(e)}
          >
            Add Product
          </Button>
          <Link
            to="/admin/manage-product"
            className="btn btn-block mt-3 btn-info"
          >
            Go back admin page
          </Link>
        </Form>
        <hr />
        {products.addProduct && addSuccess ? (
          <Alert color="success"> Add Product success </Alert>
        ) : null}
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
  {
    getAllType,
    getBrands,
    addProduct
  }
)(AddProduct);
