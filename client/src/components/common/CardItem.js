import React from "react";

import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
const CardItem = props => {
  const { item } = props;
  // console.log(item);
  return (
    <Col sm="4">
      <Card className="mb-4">
        <CardImg
          top
          width="100%"
          src={item.images.length === 0 ? "/img/nophoto.png" : item.images[0]}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{item.description} </CardTitle>
          <CardSubtitle> {item.name} </CardSubtitle>
          <CardSubtitle> {item.price} </CardSubtitle>
          <Button> View </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardItem;
