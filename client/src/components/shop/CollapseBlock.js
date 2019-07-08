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
import SpinnerIcon from "../common/SpinnerIcon";

class CollapseBlock extends Component {
  state = {
    collapse: true,
    checked: []
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleChecked = id => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilter(newChecked);
      }
    );
  };

  handleToggle = () => {
    if (this.state.collapse) return <img src="/img/up.png" alt="up" />;
    return <img src="/img/down.png" alt="up" />;
  };

  genarateBrands = brands => {
    let brandsList;
    if (brands.loading) {
      brandsList = <SpinnerIcon />;
    } else {
      brandsList = brands.brands.map((item, i) => (
        <FormGroup check key={i} className="mb-3 brand-item">
          <Label check className="container-label">
            <Input
              type="checkbox"
              name="brand"
              className="form"
              value={item._id}
              onChange={() => this.handleChecked(item._id)}
              checked={this.state.checked.indexOf(item._id) !== -1}
            />
            <span className="checkmark" />
            <span className="brand-name">{item.name}</span>
          </Label>
        </FormGroup>
      ));
    }
    return brandsList;
  };

  render() {
    const { brands, type } = this.props;
    // console.log(brands);
    return (
      <>
        <ListGroupItem onClick={this.toggle}>
          <span>{type}</span> {this.handleToggle()}
        </ListGroupItem>
        <Collapse isOpen={this.state.collapse} className="collapse-box">
          <Card>
            <CardBody className="p-0">
              <FormGroup tag="fieldset" className="mb-0">
                {this.genarateBrands(brands)}
              </FormGroup>
            </CardBody>
          </Card>
        </Collapse>
      </>
    );
  }
}

export default CollapseBlock;
