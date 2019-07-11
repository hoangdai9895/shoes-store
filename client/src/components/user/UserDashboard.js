import React from "react";
import Userlayout from "../layout/Userlayout";
import { connect } from "react-redux";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
const UserDashboard = props => {
  const { auth } = props;
  return (
    <Userlayout>
      <h2 className="title">User Information</h2>
      <hr />
      <Jumbotron>
        <p className="lead">UserName: {auth.user.name}</p>
        <p className="lead">Email: {auth.user.email}</p>
        <p className="lead">Role: {auth.user.role === 1 ? "Admin" : "User"}</p>
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
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserDashboard);
