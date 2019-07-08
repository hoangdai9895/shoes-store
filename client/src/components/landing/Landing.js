import React, { Component } from "react";
import { Container } from "reactstrap";
import SliderHome from "./SliderHome";
import Promotion from "./Promotion";

class Landing extends Component {
  render() {
    return (
      <>
        <Container fluid className="slider p-0">
          <Container>
            <SliderHome />
          </Container>
        </Container>
        <Promotion />
      </>
    );
  }
}

export default Landing;
