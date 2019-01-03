import React from "react";
import { Popover } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";

import AverageRatingBarGraph from "./averageRatingBarGraph.jsx";

class AverageRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  roundAllRatings() {
    let roundedRatings = [];
    let roundedRatingsCounter = { size: 0 };
    this.props.reviews.forEach(review => {
      let decimal = review.stars - Math.floor(review.stars);
      if (decimal >= 0.5) {
        roundedRatings.push(Math.floor(review.stars) + 1);
      } else {
        roundedRatings.push(Math.floor(review.stars));
      }
    });
    roundedRatings.forEach(rating => {
      if (roundedRatingsCounter[rating]) {
        roundedRatingsCounter[rating]++;
      } else {
        roundedRatingsCounter[rating] = 1;
      }
      roundedRatingsCounter.size++;
    });
    for (var i = 1; i < 6; i++) {
      if (!roundedRatingsCounter[i]) {
        roundedRatingsCounter[i] = 0;
      }
    }

    return roundedRatingsCounter;
  }

  toggleButton(e) {
    if (
      document.getElementById("leaveReviewButton").style.borderStyle === "inset"
    ) {
      document.getElementById("leaveReviewButton").style.borderStyle = "outset";
    } else {
      document.getElementById("leaveReviewButton").style.borderStyle = "inset";
    }
  }

  render() {
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title="">
        Amazon calculates a product’s star ratings based on a machine learned
        model instead of a raw data average. The model takes into account
        factors including the age of a rating, whether the ratings are from
        verified purchasers, and factors that establish reviewer
        trustworthiness.
      </Popover>
    );

    return (
      <React.Fragment>
        <div className="averageReviewsContainer">
          <div id="numReviews">
            {this.props.reviews.length} customer reviews
          </div>
          <div id="averageReviewStarContainer">
            {this.props.generateStars(this.props.neededStars())[0]}
            {this.props.generateStars(this.props.neededStars())[1]}
            {this.props.generateStars(this.props.neededStars())[2]}
          </div>

          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popoverHoverFocus}
          >
            <div id="averageStars">{this.props.average} out of 5 stars</div>
          </OverlayTrigger>
          <div id="chartContainer">
            <AverageRatingBarGraph roundedRatings={this.roundAllRatings()} />
          </div>
          <div className="divider" />
          <div id="averageReviewsStaticTextBold">Review this product</div>
          <div id="averageReviewsStaticText">
            Share your thoughts with other customers
          </div>
          <div>
            <button
              id="leaveReviewButton"
              type="button"
              onMouseUp={this.toggleButton}
              onMouseDown={this.toggleButton}
            >
              Write a customer review
            </button>
          </div>
          <div className="divider" id="bottom" />
        </div>
      </React.Fragment>
    );
  }
}

export default AverageRating;
