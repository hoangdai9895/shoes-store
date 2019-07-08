import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const Promotion = () => {
  const promotionTop = {
    img: "/img/promotion.webp",
    lineOne: "Shop now",
    lineTwo: "Watch history",
    linkOne: "/shop",
    linkTwo: "/history"
  };
  const promotionLeft = {
    img: "/img/promotion-left.webp",
    lineOne: "Shop now",
    linkOne: "/shop"
  };
  const promotionRight = {
    img: "/img/promotion-right.webp",
    lineOne: "Shop now",
    linkOne: "/shop"
  };
  const generatePromotionTop = promotionTop =>
    promotionTop ? (
      <div className="promotion">
        <img src={promotionTop.img} alt="" className="w-100" />
        <Link to={promotionTop.linkOne} className="shop-now">
          {promotionTop.lineOne}
          <img src="/img/icons8-arrow-30.png" alt="icon" />
        </Link>
        <Link to={promotionTop.linkTwo} className="shop-now">
          {promotionTop.lineTwo}
          <img src="/img/icons8-arrow-30.png" alt="icon" />
        </Link>
      </div>
    ) : null;
  const generatePromotionBot = promotion =>
    promotion ? (
      <div className="promotion-bot">
        <img src={promotion.img} alt="" className="w-100" />
        <Link to={promotion.linkOne} className="shop-now">
          {promotion.lineOne}
          <img src="/img/icons8-arrow-30.png" alt="icon" />
        </Link>
      </div>
    ) : null;
  return (
    <Container fluid className="mt-4 p-0">
      <Col>{generatePromotionTop(promotionTop)}</Col>

      <Row>
        <Col sm="6" className="p-0">
          {generatePromotionBot(promotionLeft)}
        </Col>
        <Col sm="6" className="p-0">
          {generatePromotionBot(promotionRight)}
        </Col>
      </Row>
    </Container>
  );
};

export default Promotion;
