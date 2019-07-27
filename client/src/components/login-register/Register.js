import React, { Component } from "react";
import { Container, FormGroup, Input, Form, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../redux/actions/auth_actions";
class Register extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    confirmpassword: "",
    errorsForm: null,
    success: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({ errorsForm: "Confirm password not match" });
    } else {
      this.props.register(userData);
      this.setState({ errorsForm: null });
    }
  };

  checkError = () => {
    const { errorsForm } = this.state;
    const { auth, errors } = this.props;
    if (errorsForm !== null) return <Alert color="danger">{errorsForm}</Alert>;
    if (auth.registerStatus) return <Alert color="success">Success !!</Alert>;
    if (errors.errEmail) return <Alert color="danger">{errors.errEmail}</Alert>;
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/shop");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/shop");
    }
  }

  render() {
    // console.log(this.props.isAuthenticated);
    const { errors, auth } = this.props;
    return (
      <Container>
        <div className="register">
          <div className="regiser__icon">
            <img
              src="https://images.unsplash.com/photo-1494496195158-c3becb4f2475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt=""
            />
          </div>
          <div className="register__input">
            <Form onSubmit={e => this.onSubmit(e)}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={this.onChange}
                  autoComplete="email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Confirm your password"
                  onChange={this.onChange}
                  autoComplete="email"
                  required
                />
              </FormGroup>
              {this.checkError()}
              <button className="register__btn my-3"> Sign up </button>
            </Form>
          </div>
          <div className="sign-in">
            Already have an account ? <Link to="/login"> Log in </Link>
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
  { register }
)(Register);
