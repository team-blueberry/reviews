import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import flatten from 'array-flatten';

import AverageRating from './components/averageRating.jsx';
import ImagesViewer from './components/imagesViewer.jsx';
import WordSearchButton from './components/wordSearchButtons.jsx';
import MainReviewsPanel from './components/mainReviewsPanel.jsx';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      average: '',
      neededStars: [],
      images: [],
      imagePreview : [],
      randomWords: [],
      searchButton: null,
      filteredReviews : [],
      sortByHelpful : true
    };
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  getReviews(listingNum) {
    return axios
      .get(`http://localhost:3013/listing/:${listingNum}`)
      .then(({ data }) => {
        this.setState({ reviews: data });
      });
  }

  getAverageStars() {
    let average = (
      this.state.reviews.reduce((acc, review) => acc + review.stars, 0) /
      this.state.reviews.length
    ).toFixed(1);
    this.setState({ average: average });
  }

  getAllImages() {
    let allImages = [];
    this.state.reviews.forEach(review => {
      if(review.images) {
        allImages.push(review.images)
      }
    })
    allImages = flatten(allImages);
    this.setState({
      images: allImages
    }, () => {this.getRandomImages()})
  }

  getRandomImages() {
    if (this.state.images) {
      let shuffledImages = this.state.images.sort(() => Math.random() - .5)
      shuffledImages = shuffledImages.slice(0,4)
      this.setState({
        imagePreview : shuffledImages
      })
    } else {
      let temp = []
      this.setState({
        imagePreview: temp
      })
    }
  }

  calculateNeededStars() {
    let average = Number(this.state.average);
    let filled = Math.floor(average);
    let decimals = average - filled;
    var halfStars = false;
    let empty = 5 - filled;
    if (decimals > 0.5) {
      halfStars = true;
      empty = empty - 1;
    }
    this.setState({
      neededStars: [filled, halfStars, empty]
    });
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  
  filterReviews() {
    let filteredReviews = this.state.reviews.filter((review) => {
      return review.text.includes(this.state.searchButton)
    })
    this.setState({
      filteredReviews : filteredReviews
    })
  }

  handleSearchButton(e) {
    e.preventDefault()
    let buttonText = e.target.innerHTML
    if (buttonText === this.state.searchButton) {
      this.setState({
        searchButton: null,
        filteredReviews : []
      })
    } else {
      this.setState({
        searchButton: buttonText
      }, () => {
        this.filterReviews()
      })
    }
  }

  getRandomWords() {
    let wordsArr = [];
    this.state.reviews.forEach(review => {
      let strippedText = review.text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      let textArr = strippedText.split(' ')
      let randomNum = this.getRandomIntInclusive(0,textArr.length -1)
      wordsArr.push(textArr[randomNum])
      textArr.splice(randomNum, 1);
      randomNum = this.getRandomIntInclusive(0,textArr.length -1)
      wordsArr.push(textArr[randomNum])
    })
    this.setState({
      randomWords : wordsArr
    })
  }

  sortByMostHelpful(a, b) {
    if (a.helpful < b.helpful) {
      return 1;
    } else if (a.helpful > b.helpful) {
      return -1;
    }
    return 0;
  }

  sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
  }


  sortByChecker() {
    if (this.state.filteredReviews.length) {
      if (this.state.sortByHelpful) {
        let temp = this.state.filteredReviews.slice()
        temp.sort(this.sortByMostHelpful) 
        this.setState({
          filteredReviews: temp
        })
      } else if (this.state.sortByHelpful === false) {
        let temp = this.state.filteredReviews.slice();
        temp.sort(this.sortByDate)
        this.setState({
          filteredReviews: temp
        })
      }
    } else {
      if (this.state.sortByHelpful) {
        let temp = this.state.reviews.slice()
        temp.sort(this.sortByMostHelpful) 
        this.setState({
          reviews: temp
        })
      } else if (this.state.sortByHelpful === false) {
        let temp = this.state.reviews.slice();
        temp.sort(this.sortByDate)
        this.setState({
          reviews: temp
        })
      }
    }
    

  }

  handleSelectChange(e) {
    if (e.target.value === 'Top Reviews') {
      this.setState({
        sortByHelpful : true
      }, () => {
        this.sortByChecker()
      })
    } else {
      this.setState({
        sortByHelpful : false
      }, () => {
        this.sortByChecker()
      })
    }
  }

  componentDidMount() {
    let url = document.URL.substring(23);
    this.getReviews(url)
      .then(() => {
        this.getAverageStars();
      })
      .then(() => {
        this.sortByChecker()
      })
      .then(() => {
        this.calculateNeededStars();
      })
      .then(() => {
        this.getAllImages()
      })
      .then(() => {
        this.getRandomWords()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className='divider' id='topDivider'/>
        <div id='reviewsMedly'>
          <div id='averageRating'>
          <AverageRating
            reviews={this.state.reviews}
            average={this.state.average}
            neededStars={this.state.neededStars}
          />
          </div>
          <div id='mainReviewsPane'>
            <div id='imagesViewer'>
              <ImagesViewer images={this.state.imagePreview}/>
            </div>
            <div id='wordSearchButtons'>
              <WordSearchButton words={this.state.randomWords} handleSearchButton={this.handleSearchButton}/>
            </div>

          </div>


          
        </div>
        <div id='reviewsPanel'>
          <MainReviewsPanel reviews={this.state.filteredReviews.length ? this.state.filteredReviews : this.state.reviews} handleSelectChange={this.handleSelectChange}/>
        </div>
      </React.Fragment>
    );
  }
}

ReactDom.render(<Review />, document.getElementById('review'));
