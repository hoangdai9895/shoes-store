import React, { Component } from "react";
import { Container, FormGroup, Input, Form } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Register extends Component {
  onChange = e => {
    console.log("aaa");
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
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={this.onChange}
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
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="confirmpassword"
                  placeholder="Confirm your password"
                  onChange={this.onChange}
                  autoComplete="email"
                />
              </FormGroup>
            </Form>
            <button className="register__btn">Sign up</button>
          </div>

          <div className="sign-in">
            Already have an account? <Link to="/login"> Log in</Link>
          </div>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(Register);
