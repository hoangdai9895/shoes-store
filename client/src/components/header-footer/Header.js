import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth_actions";
import { getCartQuantity } from "../../redux/actions/product_actions";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: []
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount() {
    let cart =
      window.localStorage.getItem("cart") !== null
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
    this.props.getCartQuantity(cart.length);
  }

  logOut = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { auth, cart } = this.props;
    return (
      <Container className="bg-light sticky-top header" fluid>
        <Container className="bg-light">
          <Row>
            <Col>
              <Navbar color="light" light expand="md">
                <Link to="/" className="navbar-brand">
                  <img
                    src="/img/logo.png"
                    alt=""
                    style={{ width: "190px", height: "40px" }}
                  />
                </Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/shop" className="nav-link">
                        Shop
                      </Link>
                    </NavItem>
                    <NavItem className="position-relative">
                      <Link to="/public/cart" className="nav-link">
                        <img
                          src="https://img.icons8.com/ios/24/000000/shopping-cart.png"
                          alt="cart"
                        />
                        {cart.quantity > 0 ? (
                          <span className="bg-danger position-absolute quantity-cart-header">
                            {cart.quantity}
                          </span>
                        ) : null}
                      </Link>
                    </NavItem>
                    {!this.props.auth.isAuthenticated ? (
                      <>
                        <NavItem>
                          <Link to="/login" className="nav-link">
                            Login
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/register" className="nav-link">
                            Register
                          </Link>
                        </NavItem>
                      </>
                    ) : (
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          <img
                            src="/img/icons8-user-50.png"
                            alt="user icon"
                            className="user-icon"
                          />
                          {auth.user.name}
                        </DropdownToggle>
                        <DropdownMenu right>
                          <Link to="/user/dashboard" className="dropdown-item">
                            My Account
                          </Link>
                          {/* <Link to="/user/cart" className="dropdown-item">
                            My Cart
                          </Link> */}
                          <DropdownItem divider />
                          <DropdownItem onClick={e => this.logOut(e)}>
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )}
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});
export default connect(
  mapStateToProps,
  { logoutUser, getCartQuantity }
)(Header);
