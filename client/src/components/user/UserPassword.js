import React, { Component } from "react";
import { connect } from "react-redux";
import Userlayout from "../layout/Userlayout";
import { Form, FormGroup, Input, Label, Alert } from "reactstrap";
// import SpinnerIcon from "../common/SpinnerIcon.js";
import { updateInfo } from "../../redux/actions/user_actions";

class UserPassword extends Component {
  state = {
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
    visible: false,
    err: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateName = (e, id, type) => {
    e.preventDefault();
    if (this.state.newpassword !== this.state.confirmpassword) {
      this.setState({
        err: { errConfirmPassword: "Password does not match !!!" }
      });
    } else {
      this.props.updateInfo(
        id,
        this.state.newpassword,
        type,
        this.state.currentpassword
      );
      this.setState({ visible: true, err: {} });
    }
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    // this.props.getUser(this.props.auth.user.id);
  }

  generateNotification = () => {
    const { errors, user } = this.props;
    // const { err } = this.state;
    if (this.state.newpassword !== this.state.confirmpassword)
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          className="mt-3"
        >
          Pass word does not match!!
        </Alert>
      );

    if (errors.errNewPassword && !user.updatePassword)
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          className="mt-3"
        >
          {this.props.errors.errNewPassword}
        </Alert>
      );
    if (user.updatePassword)
      return (
        <Alert
          color="success"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          className="mt-3"
        >
          Password was changed !!
        </Alert>
      );
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <Userlayout>
        <h2 className="title">Change user information</h2>
        <hr />
        <Form
          onSubmit={e =>
            this.updateName(
              e,
              auth.user.id,
              "password",
              this.state.currentpassword
            )
          }
        >
          <FormGroup>
            <Label for="currentpassword">Your current Password</Label>
            <Input
              type="password"
              name="currentpassword"
              placeholder="Current password"
              onChange={this.onChange}
              required
            />
            <Label for="newpassword" className="mt-3">
              New Password
            </Label>
            <Input
              type="password"
              name="newpassword"
              onChange={this.onChange}
              placeholder="New password"
              required
            />
            <Label for="confirmpassword" className="mt-3">
              Confirm your Password
            </Label>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Confirm new password"
              onChange={this.onChange}
              required
            />
            {this.generateNotification()}

            <button className="btn btn-block btn-primary mt-3">Submit</button>
          </FormGroup>
        </Form>
      </Userlayout>
    );
  }
}

const mapStateToprops = state => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
});

export default connect(
  mapStateToprops,
  { updateInfo }
)(UserPassword);
