import React from "react";

import ImagesModal from "./imagesModal.jsx";

class ImagesViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h3 id="customerImages">Customer images</h3>
        {this.props.selectedImages.map((image, i) => {
          return <img className="displayedImage" key={i} src={image} alt="" />;
        })}
        <div>
          <ImagesModal images={this.props.allImages} />
        </div>
      </React.Fragment>
    );
  }
}

export default ImagesViewer;
