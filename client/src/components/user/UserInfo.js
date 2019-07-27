import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { Form, FormGroup, Input, Button, Label, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getUser, updateInfo } from "../../redux/actions/user_actions";
import SpinnerIcon from "../common/SpinnerIcon.js";
import { Link } from "react-router-dom";
class UserInfo extends Component {
  state = {
    name: "",
    visible: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateName = (e, id, type) => {
    e.preventDefault();
    this.props.updateInfo(id, this.state.name, type);
    this.setState({ visible: true });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getUser(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user) {
      this.setState({ name: nextProps.user.user.name });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <Userlayout>
        <h2 className="title"> Change user information </h2> <hr />
        <Form onSubmit={e => this.updateName(e, user.user._id, "name")}>
          <Label for="name"> Your name </Label>
          {!user.success ? (
            <SpinnerIcon />
          ) : (
            <FormGroup className="d-flex">
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
              <Button
                color="success"
                style={{
                  margin: "0 0 0 5px"
                }}
              >
                <img src="/img/tick.png" alt="" />
              </Button>
            </FormGroup>
          )}
        </Form>
        <Link to="/user/dashboard" className="btn btn-info btn-block-xs">
          Go back to User page
        </Link>
        <Alert
          color="success"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          className="mt-3 text-center"
        >
          Your name is changed!!
        </Alert>
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, updateInfo }
)(UserInfo);
