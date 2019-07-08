import React, { Component } from "react";
import { Container, FormGroup, Input, Form, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth_actions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorsForm: { isRequired: null }
  };

  login = () => {
    // console.log(this.state);
    // console.log(this.props.errors);
    if (this.state.email === "" || this.state.email === "") {
      this.setState({
        errorsForm: { isRequired: "Email and Password is not empty" }
      });
      return;
    }
    // if(this.props.auth.err)
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ errorsForm: { isRequired: null } });
    this.props.login(user);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  alertErr = () => {
    if (this.state.email === "" || this.state.email === "") {
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/shop");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errorsForm } = this.state;
    const { errors } = this.props;
    // console.log(errors.length);
    return (
      <Container>
        <div className="login">
          <div className="login__icon">
            <img
              src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              alt="user icon"
            />
          </div>
          <div className="login__input">
            <Form>
              {errorsForm.isRequired !== null ? (
                <Alert color="danger" className="">
                  {errorsForm.isRequired}
                </Alert>
              ) : null}
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={this.onChange}
                />
                {errors.errUser ? (
                  <Alert color="danger" className="mt-3">
                    {errors.errUser}
                  </Alert>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={this.onChange}
                  autoComplete="email"
                />
                {errors.errPassword ? (
                  <Alert color="danger" className="mt-3">
                    {errors.errPassword}
                  </Alert>
                ) : null}
              </FormGroup>
            </Form>
            <button className="login__btn" onClick={() => this.login()}>
              Login
            </button>
          </div>
          <div className="forgot">
            <Link to="/forgot">Forgot password ?</Link>
          </div>
          <div className="sign-up">
            <h3>Don't have an account</h3>
            <Link to="/register">Sign up now</Link>
          </div>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
