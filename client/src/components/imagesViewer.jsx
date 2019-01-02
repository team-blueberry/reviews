import React from 'react';

class ImagesViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  getRandomImages() {
    if (this.props.images) {
      let shuffledImages = this.props.images.sort(() => Math.random() - .5)
      shuffledImages = shuffledImages.slice(0,4)
      return shuffledImages;
    } else {
      let temp = []
      return temp
    }
    

  }  

  render() {
    return (
      <React.Fragment>
        <h3 id='customerImages'>Customer images</h3>
        {this.getRandomImages().map((image, i) => {
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