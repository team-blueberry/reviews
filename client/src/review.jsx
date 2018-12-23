import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  getReviews(listingNum) {
    axios
      .get(`http://localhost:3013/listing/:${listingNum}`)
      .then(({ data }) => {
        this.setState({ reviews: data });
      });
  }

  componentDidMount() {
    var url = document.URL.substring(31);
    this.getReviews(5);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.reviews.map(review => {
          return <div>{review.title}</div>;
        })}
      </React.Fragment>
    );
  }
}

ReactDom.render(<Review />, document.getElementById('review'));
