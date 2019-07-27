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

import { Link } from "react-router-dom";

const CardItem = props => {
  const { item } = props;
  // console.log(item);
  return (
    <Col sm="6" lg="4" xl="3">
      <Card className="mb-4">
        <CardImg
          top
          width="100%"
          src={
            item.images.length === 0 ? "/img/nophoto.png" : item.images[0].url
          }
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{item.description} </CardTitle>
          <CardSubtitle> {item.name} </CardSubtitle>
          <CardSubtitle> {`$ ${item.price}`} </CardSubtitle>

          <Link to={`/shop/${item._id}`}>
            <Button outline color="secondary" className="p=0">
              View Detail
            </Button>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardItem;
