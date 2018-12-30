import React from 'react';

class AverageRatingBarGraph extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        {this.props.roundedRatings}
      </React.Fragment>
    )
  }
}

export default AverageRatingBarGraph;