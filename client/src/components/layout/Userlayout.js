import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
  {
    name: "My Account",
    link: "/user/dashboard"
  }
  // {
  //   name: "My Cart",
  //   link: "/user/cart"
  // }
];

const adminLink = [
  {
    name: "Oders",
    link: "/admin/orders"
  },
  // {
  //   name: "Site info",
  //   link: "/admin/site-info"
  // },
  {
    name: "Manage product",
    link: "/admin/manage-product"
  },
  // {
  //   name: "Add product",
  //   link: "/admin/add-product"
  // },
  {
    name: "Manage categories  ",
    link: "/admin/brand"
  }
];

const Userlayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <ListGroupItem key={i} action>
        <Link to={item.link} className="text-dark">
          {item.name}
        </Link>
      </ListGroupItem>
    ));

  return (
    <Container className="my-5">
      <Row>
        <Col sm="3">
          <h2 className="title"> My Account </h2>
          <ListGroup className="mb-4"> {generateLinks(links)} </ListGroup>
          <p className="lead"> Admin panel will go here </p> <hr />
          {props.auth.isAdmin ? (
            <>
              <h2 className="title"> Admin </h2>
              <ListGroup> {generateLinks(adminLink)} </ListGroup>
            </>
          ) : null}
        </Col>
        <Col sm="9"> {props.children} </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Userlayout);
