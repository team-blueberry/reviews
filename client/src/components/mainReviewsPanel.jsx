import React from "react";
import { Button } from "react-bootstrap";

import IndividualReview from "./individualReview.jsx";

class MainReviewsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.calculateNeededStarsIndividual = this.calculateNeededStarsIndividual.bind(
      this
    );
    this.state = {
      hideLink: this.props.reviews.length < 8
    };
  }

  calculateNeededStarsIndividual(review) {
    let filled = Math.floor(review.stars);
    let decimals = review.stars - filled;
    var halfStars = false;
    let empty = 5 - filled;
    if (decimals > 0.5) {
      halfStars = true;
      empty = empty - 1;
    }
    return [filled, halfStars, empty];
  }

  render() {
    let count = 8;
    if (this.props.reviews.length < 8) {
      count = this.props.reviews.length;
    }
    if (this.props.filtered) {
      var clearFilterButton = (
        <a href="" id="filterButton" onClick={e => this.props.clearFilter(e)}>
          Clear filter
        </a>
      );
    } else {
      var clearFilterButton = <div />;
    }

    var displayedReviews = [];
    for (var i = 0; i < count; i++) {
      displayedReviews.push(
        <div>
          <IndividualReview
            key={this.props.reviews[i].reviewId}
            neededStars={this.calculateNeededStarsIndividual(
              this.props.reviews[i]
            )}
            generateStars={this.props.generateStars}
            review={this.props.reviews[i]}
          />
        </div>
      );
    }
    return (
      <React.Fragment>
        <div id="mainReviewsStatic">
          Showing 1-{count} of {this.props.reviews.length} reviews
          {clearFilterButton}
        </div>

        <select onChange={e => this.props.handleSelectChange(e)}>
          <option value="Top Reviews">Top Reviews</option>
          <option value="Most Recent">Most Recent</option>
        </select>
        {displayedReviews}

        <div id="seeMoreReviews">
          <a
            href=""
            onClick={e => {
              e.preventDefault();
            }}
            hidden={this.props.reviews.length < 8}
          >
            See all {this.props.reviews.length} reviews
          </a>
        </div>
        <div id="writeReviewButton">
          <Button
            bsClass="reviewButton"
            bsStyle="default"
            onClick={e => {
              e.preventDefault();
            }}
          >
            {" "}
            Write a customer review{" "}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default MainReviewsPanel;
