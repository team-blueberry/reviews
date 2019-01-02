import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import AverageRating from './components/averageRating.jsx'

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      average: '',
      neededStars: []
    };
  }

  getReviews(listingNum) {
    return axios
      .get(`http://localhost:3013/listing/:${listingNum}`)
      .then(({ data }) => {
        this.setState({ reviews: data });
      });
  }

  getAverageStars() {
    let average = (this.state.reviews.reduce((acc, review) => acc + review.stars, 0) / this.state.reviews.length).toFixed(1);
    this.setState({average: average})
  }

  calculateNeededStars() {
    let average = Number(this.state.average);
    let filled = Math.floor(average);
    let decimals = average - filled;
    var halfStars = false;
    let empty = 5 - filled;
    if (decimals > .5) {
      halfStars = true;
      empty = empty - 1;
    }
    this.setState({
      neededStars : [filled, halfStars, empty]
    })
  }

  componentDidMount() {
    var url = document.URL.substring(31);
    this.getReviews(30)
    .then(() => {
      this.getAverageStars()
    })
    .then(() => {
      this.calculateNeededStars()
    })
  }


  render() {
    return (
      <React.Fragment>
        <div id="reviewsMedly">
          <AverageRating reviews={this.state.reviews} average={this.state.average} neededStars={this.state.neededStars}/>
        </div>
      </React.Fragment>
    );
  }
}

ReactDom.render(<Review />, document.getElementById('review'));
