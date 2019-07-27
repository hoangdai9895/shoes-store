import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
class ModalBox extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  generateListCartItem = cart => {
    if (cart.length === 0)
      return (
        <tr>
          <td colSpan="7">
            <Alert color="warning" className="text-center">
              You have no item!!
            </Alert>
          </td>
        </tr>
      );
    return cart.map((item, i) => (
      <tr key={item._id}>
        <td style={{ verticalAlign: "middle" }}> {(i += 1)}</td>
        <td>
          <div className="image-box-cart">
            <img src={item.image} alt="" />
          </div>
        </td>
        <td style={{ width: "30%" }}> {item.name} </td>
        <td> {item.price} </td>
        <td>
          <div className="input-quantity">
            <input
              type="number"
              min="0"
              defaultValue={item.quantity}
              onChange={this.props.changeQuantity(item._id)}
            />
          </div>
        </td>
        <td> {`$ ${item.price * parseInt(item.quantity)}`} </td>
        <td>
          <div
            className="remove-cart bg-secondary"
            onClick={() => this.props.clearCartItem(item._id)}
          >
            <img src="/img/close.png" alt="" />
          </div>
        </td>
      </tr>
    ));
  };

  generateTotal = cart => {
    let total = 0;
    if (cart.length === 0) return 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  render() {
    const { name, textNext, classname, cart } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.modal} size="lg">
          <ModalHeader
            toggle={() => this.props.closeModal()}
            className={classname}
          >
            Added "{name}" to your bag
          </ModalHeader>
          <ModalBody>
            Your cart <span> (1 products) </span>
            <Table striped responsive>
              <thead>
                <tr>
                  <th> # </th>
                  <th> Preview </th>
                  <th> Name </th>
                  <th> Price </th>
                  <th> Quantity </th>
                  <th> Total Price </th>
                  <th> Remove </th>
                </tr>
                {this.generateListCartItem(cart)}
                <tr>
                  <td colSpan="7" className="text-right">
                    Total all price:
                    <span className="font-weight-bold">
                      $ {this.generateTotal(cart)}
                    </span>
                    <span />
                  </td>
                </tr>
              </thead>
              <tbody />
            </Table>
          </ModalBody>
          <ModalFooter>
            <Link to="/public/cart" className="btn btn-primary">
              {textNext}
            </Link>
            <Button color="secondary" onClick={() => this.props.closeModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ModalBox;
