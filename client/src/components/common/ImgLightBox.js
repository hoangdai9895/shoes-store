import React, { Component } from "react";
import Lightbox from "react-images";
class ImgLightBox extends Component {
  state = {
    isOpen: true,
    currentImg: this.props.pos,
    images: []
  };

  onClose = () => {
    this.props.onClose();
  };

  gotoPrevious = () => {
    this.setState({ currentImg: this.state.currentImg - 1 });
  };

  gotoNext = () => {
    this.setState({ currentImg: this.state.currentImg + 1 });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(item => {
        images.push({ src: `${item.url}` });
      });
      return (state = { images });
    }
    return false;
  }

  render() {
    // console.log(this.state);
    return (
      <Lightbox
        currentImage={this.state.currentImg}
        images={this.state.images}
        isOpen={this.state.isOpen}
        onClickNext={() => this.gotoNext()}
        onClickPrev={() => this.gotoPrevious()}
        onClose={() => this.onClose()}
      />
    );
  }
}

export default ImgLightBox;
