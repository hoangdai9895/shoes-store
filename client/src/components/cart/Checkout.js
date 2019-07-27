import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createOrder } from "../../redux/actions/order_actions";
class Checkout extends Component {
  state = { cart: [] };

  componentDidMount() {
    let cart =
      window.localStorage.getItem("cart") !== null
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
    this.setState({ cart });
  }

  generateItem = cart =>
    cart.map((item, i) => (
      <tr key={item._id}>
        <th>{i++}</th>
        <td>
          <div className="img-checkout">
            <img src={item.image} alt="" className="w-100" />
          </div>
        </td>
        <td
          style={{
            fontSize: "14px",
            maxWidth: "250px",
            boxSizing: "border-box"
          }}
        >
          {item.name}
        </td>
        <td>{item.quantity}</td>
        <td>$ {item.price * parseInt(item.quantity)}</td>
      </tr>
    ));

  generateTotal = cart => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * parseInt(item.quantity);
    });
    return total;
  };

  onSubmit = () => {
    const order = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      items: this.state.cart
    };
    this.props.createOrder(order);
    this.props.history.push("/order-success");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { cart } = this.state;
    // console.log(this.state);
    return (
      <Container className="mt-5">
        <Row>
          <Col sm="6">
            <h3 className="title">Your Information</h3>
            <hr />
            <Form onSubmit={() => this.onSubmit()}>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={e => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  onChange={e => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  required
                  onChange={e => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  onChange={e => this.onChange(e)}
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/shop" className=" text-secondary">
                  Continue Shopping
                </Link>
                <Button color="secondary">Submit</Button>
              </div>
            </Form>
          </Col>
          <Col sm="6">
            <h3 className="title">Review Order</h3>
            <hr />
            <Table borderless responsive>
              <tbody>{this.generateItem(cart)}</tbody>
            </Table>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="">Total</div>
              <div className="total">$ {this.generateTotal(cart)}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { createOrder }
)(Checkout);
