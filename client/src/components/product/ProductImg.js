import React, { Component } from "react";
import SpinnerIcon from "../common/SpinnerIcon";
import ImgLightBox from "../common/ImgLightBox";

class ProductImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.success) {
      if (this.props.product.images) {
        let lightboxImages = [];
        this.props.product.images.forEach(item => {
          lightboxImages.push(item.url);
        });
        this.setState({ lightboxImages });
      }
    }
  }

  renderCardImage = images => {
    if (images.length > 0) return images[0].url;
    return `/img/nophoto.png`;
  };

  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({ lightbox: true, imagePos: pos });
    }
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div className="product-image-thumb" key={i}>
          <img src={item} alt="" className="w-100" />
        </div>
      ) : null
    );

  handleLightBoxClose = () => {
    this.setState({ lightbox: false });
  };

  render() {
    const { product, success } = this.props;
    return (
      <>
        <div className="product-image">
          <div className="product-image__main-pic">
            {success ? (
              <img
                src={this.renderCardImage(product.images)}
                alt=""
                className="w-100"
                onClick={() => this.handleLightBox(0)}
              />
            ) : (
              <SpinnerIcon />
            )}
          </div>
          <div className="product-image__thumb-box">{this.showThumbs()}</div>
          {this.state.lightbox ? (
            <ImgLightBox
              id={product.id}
              images={product.images}
              open={this.state.open}
              pos={this.state.imagePos}
              onClose={() => this.handleLightBoxClose()}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default ProductImg;
