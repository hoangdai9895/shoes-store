import React, { Component } from "react";
import {
  Collapse,
  FormGroup,
  Label,
  Input,
  ListGroupItem,
  Card,
  CardBody
} from "reactstrap";

class CollapseRadio extends Component {
  state = {
    collapse: true,
    value: ""
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleToggle = () => {
    if (this.state.collapse) return <img src="/img/up.png" alt="up" />;
    return <img src="/img/down.png" alt="up" />;
  };

  handleChecked = e => {
    this.setState({ value: e.target.value });
    this.props.handleFilter(e.target.value);
  };

  genarateRange = filed =>
    filed.list.map((item, i) => (
      <FormGroup check key={i} className="mb-3 brand-item">
        <Label check className="container-label">
          <Input
            type="radio"
            name="brand"
            className="form"
            value={`${item._id}`}
            onChange={e => this.handleChecked(e)}
          />
          <span className="checkmark" />
          <span className="brand-name">{item.name}</span>
        </Label>
      </FormGroup>
    ));

  render() {
    const { field, type } = this.props;
    return (
      <>
        <ListGroupItem onClick={this.toggle}>
          <span>{type}</span> {this.handleToggle()}
        </ListGroupItem>
        <Collapse isOpen={this.state.collapse} className="collapse-box">
          <Card>
            <CardBody className="p-0">
              <FormGroup tag="fieldset" className="mb-0">
                {this.genarateRange(field)}
              </FormGroup>
            </CardBody>
          </Card>
        </Collapse>
      </>
    );
  }
}

export default CollapseRadio;
