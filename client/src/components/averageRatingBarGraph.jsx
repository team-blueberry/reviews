import React from 'react';
import {Bar} from 'react-chartjs-2';


class AverageRatingBarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage : {}
    }
  }




  render() {
    var chartdata = {
      labels: ['5 star', '4 star', '3 star', '2 star', '1 star'],
      datasets : [{
        label : 'test',
        data : [
          this.props.roundedRatings['5'],
          this.props.roundedRatings['4'],
          this.props.roundedRatings['3'],
          this.props.roundedRatings['2'],
          this.props.roundedRatings['1'],
        ],
        backgroundColor : [
          'rgba(225, 99, 132, 0.6'
        ]
      }]
    }
    return (
      <Bar
        data={chartdata}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
    )
  }

}

export default AverageRatingBarGraph;