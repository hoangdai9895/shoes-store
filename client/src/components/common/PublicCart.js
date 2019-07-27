import React, { Component } from "react";
import { Container, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCartQuantity } from "../../redux/actions/product_actions";

class PublicCart extends Component {
  state = { cart: [] };

  changeQuantity = id => e => {
    const { cart } = this.state;
    for (let key in cart) {
      if (cart[key]._id === id) {
        cart[key].quantity = e.target.value;
      }
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCartItem = id => {
    const { cart } = this.state;
    if (window.confirm("Are you sure ???")) {
      let newCart = cart.filter(item => item._id !== id);
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      this.setState({ cart: newCart });
      this.props.getCartQuantity(newCart.length);
    }
  };

  generateTotal = cart => {
    let total = 0;
    if (cart.length === 0) return 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  componentDidMount() {
    let cart =
      window.localStorage.getItem("cart") !== null
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
    this.setState({ cart });
    this.props.getCartQuantity(cart.length);
  }

  generateListCartItem = cart => {
    if (cart.length === 0)
      return (
        <tr>
          <td colSpan="7">
            <Alert color="warning" className="text-center">
              You have no item!!
            </Alert>
          </td>
        </tr>
      );
    return cart.map((item, i) => (
      <tr key={item._id}>
        <td style={{ verticalAlign: "middle" }}> {(i += 1)} </td>
        <td>
          <div className="image-box-cart">
            <img src={item.image} alt="" />
          </div>
        </td>
        <td style={{ width: "30%" }}> {item.name} </td> <td> {item.price} </td>
        <td>
          <div className="input-quantity">
            <input
              type="number"
              min="1"
              defaultValue={item.quantity}
              onChange={this.changeQuantity(item._id)}
            />
          </div>
        </td>
        <td> {`$ ${item.price * parseInt(item.quantity)}`} </td>
        <td>
          <div
            className="remove-cart bg-secondary"
            onClick={() => this.clearCartItem(item._id)}
          >
            <img src="/img/close.png" alt="" />
          </div>
        </td>
      </tr>
    ));
  };

  render() {
    const { cart } = this.state;
    return (
      <Container>
        <h2 className="title mt-5"> Your Cart </h2>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th> <th> Preview </th> <th> Name </th> <th> Price </th>
              <th> Quantity </th> <th> Total Price </th>
              <th className="text-center"> Remove </th>
            </tr>
          </thead>
          <tbody>
            {this.generateListCartItem(cart)}
            <tr>
              <td colSpan="5" />
              <td> Total </td>
              <td className="text-center">
                <span className="font-weight-bold">
                  $ {this.generateTotal(cart)}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <div className="d-flex justify-content-between">
          <Link to="/shop" className="btn btn-secondary">
            Continue Shopping
          </Link>
          {cart.length === 0 ? null : (
            <Link to="/checkout" className="btn btn-dark">
              Check out
            </Link>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCartQuantity }
)(PublicCart);
