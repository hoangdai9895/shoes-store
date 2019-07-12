import React, { Component } from "react";
import SpinnerIcon from "../common/SpinnerIcon";

class ProductInformation extends Component {
  render() {
    const { product, loading } = this.props;
    return (
      <>
        {loading ? (
          <SpinnerIcon />
        ) : (
          <>
            <div className="product__des">{product.description}</div>
            <h1 className="product__title">{product.name}</h1>
            <div className="product__price">{`$${product.price}`}</div>
          </>
        )}
        <div className="product__add">
          <span>ADD TO BAG</span>
          <img src="/img/icons8-arrow-30.png" alt="" />
        </div>
        <div className="product__text my-3">
          This product is excluded from all promotional discounts and offers.
        </div>
        <div className="product__shipping">
          <h3 className="title">Free Delivery and Returns</h3>
          <p>Your order of 5.000.000₫ or more gets free standard delivery.</p>
          <ul className="pl-3">
            <li>Standard delivered 4-5 Business Days</li>
            <li>Express delivered 2-4 Business Days</li>
          </ul>
          <p>
            Orders are processed and delivered Monday-Friday (excluding public
            holidays)
          </p>
        </div>
      </>
    );
  }
}
export default ProductInformation;
