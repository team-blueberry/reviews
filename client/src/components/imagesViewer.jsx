import React from 'react';

class ImagesViewer extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <React.Fragment>
        <h3 id='customerImages'>Customer images</h3>
        {this.props.images.map((image, i) => {
          return <img className = 'displayedImage' key={i} src={image} alt=''/> 
        }) }
        <div>
          <a id="seeMoreImages" href='#CustomerImages'>See all customer images</a>
        </div>
      </React.Fragment>
    )
  }
}

export default ImagesViewer;