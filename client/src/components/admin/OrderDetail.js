import React, { Component } from "react";
import Userlayout from "../layout/Userlayout";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOrderById, finishOrder } from "../../redux/actions/order_actions";
import SpinnerIcon from "../common/SpinnerIcon";

class OrderDetail extends Component {
  state = {
    modal: false
  };

  componentDidMount() {
    this.props.getOrderById(this.props.match.params.id);
  }

  generateOrderItem = order => {
    if (order.loading)
      return (
        <tr>
          <td colSpan="4">
            <SpinnerIcon />
          </td>
        </tr>
      );
    if (order.success)
      return order.order.items.map((e, i) => (
        <tr key={i}>
          <th>{i + 1}</th>
          <td>{e.name}</td>
          <td>{e.quantity}</td>
          <td>$ {e.quantity * parseInt(e.price)}</td>
        </tr>
      ));
  };

  generateOrderBill = order => {
    if (order.loading) return <SpinnerIcon />;
    if (order.success)
      return (
        <>
          <p>
            <span className="font-weight-bold">Name: </span> {order.order.name}
          </p>
          <p>
            <span className="font-weight-bold">Address:</span>{" "}
            {order.order.address}
          </p>
          <p>
            <span className="font-weight-bold">Phone:</span> {order.order.phone}
          </p>
        </>
      );
  };

  generateTotal = items => {
    let total = 0;
    for (let key in items) {
      total += items[key].price * parseInt(items[key].quantity);
    }
    return total;
  };

  shipOrder = id => {
    this.toggle();
    this.props.finishOrder(id, "detail");
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.auth.user.role !== 1) {
      props.history.push("/login");
      return true;
    }
    return null;
  }

  render() {
    const { errors, order } = this.props;
    return (
      <Userlayout>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Success !!</ModalHeader>
            <ModalBody>Your order is completed</ModalBody>
            <ModalFooter>
              <Link
                to="/admin/orders"
                className="btn btn-primary"
                onClick={this.toggle}
              >
                Go back to order list
              </Link>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <h2 className="title"> Orders Detail </h2> <hr />
        {errors.errOrderId ? (
          <img src="/img/no_results.png" alt="" />
        ) : (
          <>
            <p className="lead font-weight-bold">Billing Information</p>
            {this.generateOrderBill(order)}
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.generateOrderItem(order)}
                <tr>
                  <td colSpan="3">Total Price</td>
                  <td>$ {this.generateTotal(order.order.items)}</td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <Link className="btn btn-primary" to="/admin/orders">
                Go back order list
              </Link>
              {!order.order.isFinished ? (
                <Button
                  color="secondary"
                  onClick={() => this.shipOrder(order.order._id)}
                >
                  Ship Now
                </Button>
              ) : null}
            </div>
          </>
        )}
      </Userlayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getOrderById, finishOrder }
)(OrderDetail);
