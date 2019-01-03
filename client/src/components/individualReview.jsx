import React from "react";
import { Button } from "react-bootstrap";

class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: this.props.review.helpful,
      disabled: false
    };
    this.handleButton = this.handleButton.bind(this);
  }

  formatDate(date) {
    let d = new Date(date);
    let formattedDate =
      d.toLocaleString("en", { month: "long" }) +
      " " +
      d.toLocaleString("en", { day: "numeric" }) +
      ", " +
      d.toLocaleString("en", { year: "numeric" });
    return formattedDate;
  }

  handleButton(e) {
    let newVal = this.state.helpful + 1;
    this.setState({
      helpful: newVal,
      disabled: true
    });
  }

  render() {
    var imagesArr = [];
    if (this.props.review.images) {
      imagesArr = this.props.review.images.map((image, i) => {
        return <img className="displayedImage" key={i} src={image} alt="" />;
      });
    }
    if (this.props.review.verified) {
      var verifiedDiv = <div id="verified">Verified Purchase</div>;
    } else {
      var verifiedDiv = <div />;
    }
    return (
      <React.Fragment>
        <div id="individualReviewContainer">
          <div id="reviewHeader">
            <div id="profileInfo">
              <img
                src={`${this.props.review.profilepicture}${Math.random()}`}
              />
              <span id="fullName">{this.props.review.name}</span>
            </div>
            <br />
            <div id="reviewStarContainer">
              {this.props.generateStars(this.props.neededStars)[0]}
              {this.props.generateStars(this.props.neededStars)[1]}
              {this.props.generateStars(this.props.neededStars)[2]}
            </div>
            <div id="reviewTitle">{this.props.review.title}</div>
          </div>
          <div id="reviewAuthor">
            By <a href="">{this.props.review.username}</a> on{" "}
            {this.formatDate(this.props.review.date)}
            {verifiedDiv}
          </div>
          <br />
          <div id="reviewText">
            <br />
            {this.props.review.text}
          </div>
          <div id="reviewImageContainer">
            <div>{imagesArr}</div>
          </div>
          <div id="helpfulCount">
            {this.state.helpful
              ? this.state.helpful
              : this.props.review.helpful}{" "}
            people found this helpful
          </div>
          <div id="reviewFooter">
            <Button
              className="helpfulButton"
              bsStyle="default"
              disabled={this.state.disabled}
              onClick={e => this.handleButton(e)}
            >
              Helpful
            </Button>
            <i className="verticalSeperator" />
            <span className="reviewFooterStatic">Comment</span>
            <i className="verticalSeperator" />
            <span className="reviewFooterStatic">Report abuse</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndividualReview;
