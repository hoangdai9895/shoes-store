import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import SpinnerIcon from "./SpinnerIcon";
class FileUpload extends Component {
  state = {
    uploadFiles: [],
    uploading: false
  };

  onDrop = files => {
    this.setState({
      uploading: true
    });
    const config = {
      "content-type": "multipart/form-data"
    };
    let formData = new FormData();
    formData.append("file", files[0]);
    axios.post("/api/product/uploadimage", formData, config).then(res => {
      this.setState(
        {
          uploading: false,
          uploadFiles: [...this.state.uploadFiles, res.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadFiles);
        }
      );
    });
  };

  onRemove = id => {
    const removeImage = {
      id: id
    };
    axios.post(`/api/product/removeimage`, removeImage).then(res => {
      let images = this.state.uploadFiles.filter(item => item.public_id !== id);
      this.setState(
        {
          uploadFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () => {
    if (this.state.uploading)
      return (
        <li className="img-uploaded">
          <SpinnerIcon />
        </li>
      );
    return this.state.uploadFiles.map((item, i) => (
      <li
        key={i}
        onClick={() => this.onRemove(item.public_id)}
        className="img-uploaded"
      >
        <img src={item.url} alt="img upload" />
        <div
          className="remove-img"
          onClick={() => this.onRemove(item.public_id)}
        >
          <img src="/img/close.png" alt="close img" />
        </div>
      </li>
    ));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadFiles: []
      });
    }
    return null;
  }

  render() {
    return (
      <>
        <Dropzone onDrop={e => this.onDrop(e)}>
          {({ getRootProps, getInputProps }) => (
            <section className="container p-0">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="mb-0">
                  Drag 'n' drop some images files here, or click to select files
                </p>
              </div>
              <aside className="mt-3">
                <h4>Files</h4>
                <ul className="box-img-upload">{this.showUploadedImages()}</ul>
              </aside>
            </section>
          )}
        </Dropzone>
      </>
    );
  }
}

export default FileUpload;
