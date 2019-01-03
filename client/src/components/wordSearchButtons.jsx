import React from "react";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";

class WordSearchButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null
    };
  }

  render() {
    let buttons = [];
    for (let i = 0; i < this.props.words.length; i++) {
      if (i % 7 === 0) {
        buttons.push(
          <div key={`${i}-br`}>
            <br />
            <br />
          </div>
        );
      }
      buttons.push(
        <Button
          className="searchButton"
          bsStyle="primary"
          key={i}
          onClick={e => this.props.handleSearchButton(e)}
        >
          {this.props.words[i]}
        </Button>
      );
    }
    return (
      <React.Fragment>
        <h3 id="reviewButtonStatic">Read reviews that mention</h3>
        <div id="buttonHolder">
          <ButtonToolbar>{buttons}</ButtonToolbar>
        </div>
      </React.Fragment>
    );
  }
}

export default WordSearchButtons;
