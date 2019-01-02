import React from 'react';
import AverageRatingBarGraph from './averageRatingBarGraph.jsx'

class AverageRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  generateStars() {
    let filledArr = [];
    for (var i = 0; i < this.props.neededStars[0]; i++) {
      filledArr.push(i);
    }
    let filledStars = filledArr.map((num) => {
      return <img key={num} className='star' src="https://visualpharm.com/assets/445/Star%20Filled-595b40b65ba036ed117d408e.svg" alt=""/>
    })
    let halfArr;
    if (this.props.neededStars[1] === true) {
      halfArr = <img className='star' src="https://visualpharm.com/assets/247/Star%20Half-595b40b85ba036ed117dab5e.svg" alt=""></img>
    }

    let emptyArr = []
    for (var i = 0; i < this.props.neededStars[2]; i++) {
      emptyArr.push(i);
    }
    let emptyStars = emptyArr.map((num) => {
      return <img key={num} className="star" src="https://visualpharm.com/assets/797/Christmas%20Star-595b40b75ba036ed117d58dc.svg" alt=""/>
    })
    return [filledStars, halfArr, emptyStars]
  }

  roundAllRatings() {
    let roundedRatings = [];
    let roundedRatingsCounter = {size: 0}
    this.props.reviews.forEach(review => {
      let decimal = review.stars - Math.floor(review.stars);
      if (decimal >= .5) {
        roundedRatings.push(Math.floor(review.stars) + 1)
      } else {
        roundedRatings.push(Math.floor(review.stars))
      }
    })
    roundedRatings.forEach(rating => {
      if (roundedRatingsCounter[rating]) {
        roundedRatingsCounter[rating]++
      } else {
        roundedRatingsCounter[rating] = 1
      }
      roundedRatingsCounter.size++
    })
    for (var i = 1; i < 6; i++) {
      if (!roundedRatingsCounter[i]) {
        roundedRatingsCounter[i] = 0;
      }
    }

    return roundedRatingsCounter;
  }

  toggleButton(e) {
    if (document.getElementById('leaveReviewButton').style.borderStyle === 'inset') {
      document.getElementById('leaveReviewButton').style.borderStyle = 'outset'
    } else {
      document.getElementById('leaveReviewButton').style.borderStyle = 'inset'
    }
  }



  render() {
    


    return (
      <React.Fragment>
        <div className="averageReviewsContainer">
        <div id='numReviews'>{this.props.reviews.length} customer reviews</div>
        <div id="averageReviewStarContainer">
            {this.generateStars()[0]}
            {this.generateStars()[1]}
            {this.generateStars()[2]}
        </div>
        <div id='averageStars'>{this.props.average} out of 5 stars</div>
        <div id='chartContainer'>
        <AverageRatingBarGraph roundedRatings={this.roundAllRatings()}/>
        </div>
        <div className='divider'/>
        <div id='averageReviewsStaticTextBold'>
          Review this product
        </div>
        <div id='averageReviewsStaticText'>
          Share your thoughts with other customers
        </div>
        <div>
          <button id="leaveReviewButton" type='button' onMouseUp={this.toggleButton} onMouseDown={this.toggleButton}>Write a customer review</button>
        </div>
        <div className='divider' id="bottom"/>
        </div>
      </React.Fragment>
    )

  }



}

export default AverageRating;