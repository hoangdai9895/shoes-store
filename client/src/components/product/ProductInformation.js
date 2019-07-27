import React, { Component } from "react";
import SpinnerIcon from "../common/SpinnerIcon";
import ModalBox from "../common/ModalBox";
import { connect } from "react-redux";
import { getCartQuantity } from "../../redux/actions/product_actions";
class ProductInformation extends Component {
  state = {
    modal: false,
    cart: []
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  addToCart = (product, loading) => {
    const { cart } = this.state;
    if (!loading) {
      if (cart.find(item => item._id === product._id) === undefined) {
        let productToCart = {
          _id: product._id,
          name: product.name,
          image: product.images[0].url,
          quantity: 1,
          price: product.price
        };
        cart.push(productToCart);
      } else {
        for (let key in cart) {
          if (cart[key]._id === product._id) {
            cart[key].quantity = parseInt(cart[key].quantity) + 1;
          }
        }
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      this.openModal();
      this.props.getCartQuantity(cart.length);
    }
  };

  changeQuantity = id => e => {
    const { cart } = this.state;
    for (let key in cart) {
      if (cart[key]._id === id) {
        cart[key].quantity = e.target.value;
      }
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
    this.props.getCartQuantity(cart.length);
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

  componentDidMount() {
    let cart =
      window.localStorage.getItem("cart") !== null
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
    this.setState({ cart });
    this.props.getCartQuantity(cart.length);
  }

  render() {
    const { product, loading } = this.props;
    const { modal, cart } = this.state;
    return (
      <>
        <ModalBox
          cart={cart}
          modal={modal}
          closeModal={() => this.closeModal()}
          name={product.name}
          textNext="Go To Bag"
          classname="bg-lightgray"
          product={product}
          changeQuantity={type => this.changeQuantity(type)}
          clearCartItem={id => this.clearCartItem(id)}
        />
        {loading ? (
          <SpinnerIcon />
        ) : (
          <>
            <div className="product__des">{product.description}</div>
            <h1 className="product__title">{product.name}</h1>
            <div className="product__price">{`$${product.price}`}</div>
          </>
        )}
        <div
          className="product__add"
          onClick={() => this.addToCart(product, loading)}
        >
          <span>ADD TO BAG</span>
          <img src="/img/icons8-arrow-30.png" alt="" />
        </div>
        <div className="product__text my-3">
          This product is excluded from all promotional discounts and offers.
        </div>
        <div className="product__shipping">
          <h3 className="title">Free Delivery and Returns</h3>
          <p>Your order of 5.000.000₫ or more gets free standard delivery.</p>
          <ul className="pl-3">
            <li>Standard delivered 4-5 Business Days</li>
            <li>Express delivered 2-4 Business Days</li>
          </ul>
          <p>
            Orders are processed and delivered Monday-Friday (excluding public
            holidays)
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCartQuantity }
)(ProductInformation);
