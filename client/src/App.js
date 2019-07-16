import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loadable from "react-loadable";
import setAuthToken from "./components/common/SetAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/auth_actions";
import SpinnerIcon from "./components/common/SpinnerIcon";

// check login
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

const Header = Loadable({
  loader: () => import("./components/header-footer/Header"),
  loading: SpinnerIcon
});

const Footer = Loadable({
  loader: () => import("./components/header-footer/Footer"),
  loading: SpinnerIcon
});

const Landing = Loadable({
  loader: () => import("./components/landing/Landing"),
  loading: SpinnerIcon
});

const UserDashboard = Loadable({
  loader: () => import("./components/user/UserDashboard"),
  loading: SpinnerIcon
});

const UserInfo = Loadable({
  loader: () => import("./components/user/UserInfo"),
  loading: SpinnerIcon
});

const Mycart = Loadable({
  loader: () => import("./components/user/Mycart"),
  loading: SpinnerIcon
});

const PublicCart = Loadable({
  loader: () => import("./components/common/PublicCart.js"),
  loading: SpinnerIcon
});

const CheckOut = Loadable({
  loader: () => import("./components/cart/Checkout"),
  loading: SpinnerIcon
});

const Login = Loadable({
  loader: () => import("./components/login-register/Login"),
  loading: SpinnerIcon
});

const Register = Loadable({
  loader: () => import("./components/login-register/Register"),
  loading: SpinnerIcon
});

const NotFound = Loadable({
  loader: () => import("./components/common/NotFound"),
  loading: SpinnerIcon
});

const Shop = Loadable({
  loader: () => import("./components/shop/Shop"),
  loading: SpinnerIcon
});

const ManageBrand = Loadable({
  loader: () => import("./components/admin/MangeBrands"),
  loading: SpinnerIcon
});

const Product = Loadable({
  loader: () => import("./components/product/Product"),
  loading: SpinnerIcon
});

const AddProduct = Loadable({
  loader: () => import("./components/admin/AddProduct"),
  loading: SpinnerIcon
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user/dashboard" component={UserDashboard} />
            <Route exact path="/user/info" component={UserInfo} />
            <Route exact path="/user/cart" component={Mycart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/public/cart" component={PublicCart} />
            <Route exact path="/checkout" component={CheckOut} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/shop/:id" component={Product} />
            <Route exact path="/admin/brand" component={ManageBrand} />
            <Route exact path="/admin/add-product" component={AddProduct} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
