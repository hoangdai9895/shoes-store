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
class Order extends Component {
  componentDidMount() {
    this.props.getOrders();
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
        <td>{e.date}</td>
        <td>{e.name}</td>
        <td>$ {this.subTotal(e.items)}</td>
        <td>{e.isFinished ? "Complete" : "Pending"}</td>
        <td>
          <Link className="btn btn-primary mr-1" to={`/admin/orders/${e._id}`}>
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
        <Table>
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
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrders, finishOrder, deleteOrder }
)(Order);
