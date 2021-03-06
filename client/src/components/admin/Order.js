import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import Userlayout from "../layout/Userlayout";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getOrders,
  finishOrder,
  deleteOrder
} from "../../redux/actions/order_actions";
import SpinnerIcon from "../common/SpinnerIcon";
import Moment from "react-moment";
class Order extends Component {
  state = {};
  componentDidMount() {
    if (!this.props.auth.isAdmin) {
      this.props.history.push("/shop");
    }
    this.props.getOrders();
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.auth.isAdmin) {
      props.history.push("/login");
    }
    return state;
  }

  generateListOrderItem = (list, loading) => {
    if (loading)
      return (
        <tr>
          <td colSpan="6">
            <SpinnerIcon />
          </td>
        </tr>
      );
    return list.map((e, i) => (
      <tr key={i} style={{ background: e.isFinished ? "#f1f1f1" : "" }}>
        <th>{i + 1}</th>
        <td>
          <Moment format="YYYY-MM-DD">{e.date}</Moment>
        </td>
        <td>{e.name}</td>
        <td>$ {this.subTotal(e.items)}</td>
        <td>{e.isFinished ? "Complete" : "Pending"}</td>
        <td>
          <div className="group-order-actions">
            <Link
              className="btn btn-primary mr-1"
              to={`/admin/orders/${e._id}`}
            >
              View
            </Link>
            {!e.isFinished ? (
              <Button
                color="success"
                onClick={() => this.props.finishOrder(e._id)}
              >
                Ship
              </Button>
            ) : (
              <Button color="danger" onClick={() => this.removeOrder(e._id)}>
                Remove
              </Button>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  removeOrder = id => {
    if (window.confirm("Are you sure !!")) {
      this.props.deleteOrder(id);
    }
  };

  subTotal = itemsArray => {
    let total = 0;
    for (let key in itemsArray) {
      total += itemsArray[key].price * parseInt(itemsArray[key].quantity);
    }
    return total;
  };

  render() {
    const { order } = this.props;
    return (
      <Userlayout>
        <h2 className="title"> Orders List </h2> <hr />
        <p> You can mange orders here!!! </p>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Puchased on</th>
              <th>Ship to Name</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {this.generateListOrderItem(order.list, order.loading)}
          </thead>
          <tbody />
        </Table>
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOrders, finishOrder, deleteOrder }
)(Order);
