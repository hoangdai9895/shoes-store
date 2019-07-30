import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import { connect } from "react-redux";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/actions/user_actions";
import SpinnerIcon from "../common/SpinnerIcon";
class UserDashboard extends Component {
  state = {};
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getUser(this.props.auth.user.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.auth.isAuthenticated) {
      nextProps.history.push("/login");
      return true;
    }
    return null;
  }

  render() {
    const { user } = this.props;
    return (
      <Userlayout>
        <h2 className="title">User Information</h2>
        <hr />
        <Jumbotron>
          <div className="lead">
            UserName:{" "}
            {user.user.name ? (
              user.user.name
            ) : (
              <span style={{ verticalAlign: "text-bottom" }}>
                <SpinnerIcon type="3grow" />
              </span>
            )}
          </div>
          <div className="lead">
            Email:{" "}
            {user.user.email ? (
              user.user.email
            ) : (
              <span style={{ verticalAlign: "text-bottom" }}>
                <SpinnerIcon type="3grow" />
              </span>
            )}
          </div>
          <div className="lead">
            Role: {user.user.role === 1 ? "Admin" : "User"}
          </div>
          <hr className="my-2" />
          <p>You can change your information and password right here !!</p>
          <p className="lead">
            <Link to="/user/information">
              <Button color="primary">Edit Information</Button>
            </Link>
            <Link className="ml-3" to="/user/password">
              <Button color="primary">Change password</Button>
            </Link>
          </p>
        </Jumbotron>
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
  { getUser }
)(UserDashboard);
