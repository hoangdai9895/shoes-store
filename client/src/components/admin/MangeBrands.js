import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { connect } from "react-redux";
import {
  Collapse,
  Button,
  Form,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroup,
  Alert
} from "reactstrap";
import { getBrands, addBrand } from "../../redux/actions/brands_actions";
import SpinnerIcon from "../common/SpinnerIcon";

class MangeBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      disabled: false,

      name: "",
      errorsInput: {
        isEmpty: ""
      }
    };
  }

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse,
      disabled: !this.state.disabled
    });
  };

  close = e => {
    e.preventDefault();
    this.toggle();
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addNewBrand = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({
        errorsInput: { isEmpty: "Brand name is not empty" }
      });
      return;
    }
    const newBrand = {
      name: this.state.name
    };
    this.props.addBrand(newBrand);
    this.setState({
      errorsInput: { isEmpty: "" },
      name: ""
    });
  };

  generateBrands = brands =>
    brands.length > 0 ? (
      brands.map((item, i) => (
        <ListGroupItem key={i}> {item.name} </ListGroupItem>
      ))
    ) : (
      <p> You have no brand, create now! </p>
    );

  componentDidMount() {
    if (!this.props.auth.isAdmin) {
      this.props.history.push("/");
    }
    this.props.getBrands();
  }

  render() {
    const { disabled, collapse, errorsInput } = this.state;
    const { brands, errors } = this.props;
    // console.log(brands.brands.success);
    return (
      <Userlayout>
        <h2 className="title"> Manage Brands </h2> <hr />
        <p> You can edit brand name here!!! </p>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
          disabled={disabled}
        >
          Add new brand
          <img
            src="/img/plus.png"
            alt="plus"
            style={{
              width: "20px",
              verticalAlign: "sub",
              margin: "0 0 0 10px"
            }}
          />
        </Button>
        <Collapse isOpen={collapse}>
          <Form>
            <FormGroup className="d-flex">
              <Input
                type="text"
                name="name"
                placeholder="Brand name"
                onChange={e => this.onChange(e)}
                value={this.state.name}
              />
              <Button
                color="danger"
                style={{
                  margin: "0 0 0 5px"
                }}
                onClick={e => this.close(e)}
              >
                <img src="/img/close.png" alt="" />
              </Button>
              <Button
                color="success"
                style={{
                  margin: "0 0 0 5px"
                }}
                onClick={e => this.addNewBrand(e)}
              >
                <img src="/img/tick.png" alt="" />
              </Button>
            </FormGroup>
            {!brands.success && errors.errCreateBrand ? (
              <Alert color="danger"> {errors.errCreateBrand} </Alert>
            ) : null}
            {errorsInput.isEmpty !== "" ? (
              <Alert color="danger"> {errorsInput.isEmpty} </Alert>
            ) : null}
            {brands.success ? <Alert color="success"> Success!! </Alert> : null}
          </Form>
        </Collapse>
        <hr />
        <p> Brands </p>
        <ListGroup className="list-brands">
          {brands.loading ? <SpinnerIcon /> : this.generateBrands(brands.list)}
        </ListGroup>
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  brands: state.brands,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBrands, addBrand }
)(MangeBrands);
