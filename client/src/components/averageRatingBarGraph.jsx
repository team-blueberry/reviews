import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

class AverageRatingBarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: {}
    };
  }

  render() {
    var chartdata = {
      labels: ["5 star", "4 star", "3 star", "2 star", "1 star"],
      datasets: [
        {
          label: "actualNum",
          fill: false,
          data: [
            this.props.roundedRatings["5"],
            this.props.roundedRatings["4"],
            this.props.roundedRatings["3"],
            this.props.roundedRatings["2"],
            this.props.roundedRatings["1"]
          ],
          backgroundColor: "orange"
        },
        {
          label: "percentRemaining",
          backgroundColor: "#f3f3f3",
          data: [
            this.props.roundedRatings.size - this.props.roundedRatings["5"],
            this.props.roundedRatings.size - this.props.roundedRatings["4"],
            this.props.roundedRatings.size - this.props.roundedRatings["3"],
            this.props.roundedRatings.size - this.props.roundedRatings["2"],
            this.props.roundedRatings.size - this.props.roundedRatings["1"]
          ],
          datalabels: {
            display: true
          }
        }
      ]
    };
    return (
      <HorizontalBar
        data={chartdata}
        options={{
          responsive: true,
          animation: false,
          maintainAspectRatio: false,
          legend: { display: false },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                display: false,
                ticks: {
                  max: this.props.roundedRatings.size,
                  beginAtZero: true
                },
                stacked: true
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  fontColor: "#501326",
                  fontSize: 13
                }
              }
            ]
          },
          layout: {
            padding: {
              right: 50
            }
          },
          tooltips: {enabled: false},
          hover: {mode: null},      
          plugins: {
            datalabels: {
              anchor: "end",
              align: "end",
              color: "#555",
              // clamp: true,
              font: {
                size: "13"
              },
              display: false,
              formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                  sum += data;
                });
                let percentage = (100 - (value * 100) / sum).toFixed(0) + "%";
                return percentage;
              }
            }
          }
        }}
      />
    );
  }
}

export default AverageRatingBarGraph;
