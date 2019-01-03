import React from "react";
import { Modal } from "react-bootstrap";

class ImagesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleOpen(e) {
    e.preventDefault();
    this.setState({
      show: true
    });
  }

  render() {
    return (
      <div>
        <a
          id="seeMoreImages"
          href=""
          onClick={e => {
            this.handleOpen(e);
          }}
        >
          See all customer images
        </a>

        <Modal show={this.state.show} onHide={this.handleClose} bsSize="large">
          <Modal.Header closeButton />
          <Modal.Body>
            {this.props.images.map((image, i) => {
              return (
                <img
                  src={image}
                  key={i}
                  alt="product image"
                  className="modalImage"
                />
              );
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ImagesModal;
