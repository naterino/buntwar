import React, { Component } from "react";
import Match from "./Match";
import update from "react-addons-update";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSkaterClick = this.handleSkaterClick.bind(this);
    this.state = {
      matchesRoundOne: [
        {
          skater1: "Brock",
          skater2: "Westgate",
          target: 0,
          inputName: "entry.900167295",
        },
        {
          skater1: "Dixon",
          skater2: "Hart",
          target: 0,
          inputName: "entry.72556789",
        },
        {
          skater1: "Brown",
          skater2: "Joslin",
          target: 1,
          inputName: "entry.656609134",
        },
        {
          skater1: "Silva",
          skater2: "Foster",
          target: 1,
          inputName: "entry.673762420",
        },
        {
          skater1: "Rieder",
          skater2: "Choi",
          target: 2,
          inputName: "entry.1483634498",
        },
        {
          skater1: "Hawkins",
          skater2: "Herman",
          target: 2,
          inputName: "entry.1317801193",
        },
        {
          skater1: "Cautela",
          skater2: "Decenzo",
          target: 3,
          inputName: "entry.1881164216",
        },
        {
          skater1: "Kalis",
          skater2: "Trahan",
          target: 3,
          inputName: "entry.1659865997",
        },
      ],
      matchesRoundTwo: [
        {
          skater1: null,
          skater2: null,
          target: 0,
          inputName: "entry.1259456267",
        },
        {
          skater1: null,
          skater2: null,
          target: 0,
          inputName: "entry.469626937",
        },
        {
          skater1: null,
          skater2: null,
          target: 1,
          inputName: "entry.1918032954",
        },
        {
          skater1: null,
          skater2: null,
          target: 1,
          inputName: "entry.1194770860",
        },
      ],
      matchesRoundThree: [
        {
          skater1: null,
          skater2: null,
          target: 0,
          inputName: "entry.826620085",
        },
        {
          skater1: null,
          skater2: null,
          target: 0,
          inputName: "entry.628055565",
        },
      ],

      matchesRoundFour: [
        {
          skater1: null,
          skater2: null,
          inputName: "entry.913266597",
        },
      ],

      winner: null,
      submitted: false,
    };

    this.baseState = this.state;
  }

  handleSkaterClick = function (round, skater, target, index) {
    var stateCopy = Object.assign({}, this.state);
    if (round === 1) {
      if (index % 2) {
        stateCopy.matchesRoundTwo[target].skater2 = skater;
      } else {
        stateCopy.matchesRoundTwo[target].skater1 = skater;
      }
    } else if (round === 2) {
      if (index % 2) {
        stateCopy.matchesRoundThree[target].skater2 = skater;
      } else {
        stateCopy.matchesRoundThree[target].skater1 = skater;
      }
    } else if (round === 3) {
      if (index % 2) {
        stateCopy.matchesRoundFour[target].skater2 = skater;
      } else {
        stateCopy.matchesRoundFour[target].skater1 = skater;
      }
    } else {
      stateCopy.winner = skater;
    }

    stateCopy.disabled = false;
    this.setState(stateCopy);
  };

  formSubmit = function () {
    setTimeout(() => {
      this.setState({
        submitted: true,
      });
    }, 100);
  };

  formReset = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  formDisabled = (e) => {
    e.preventDefault();
    this.setState({
      showError: true,
    });
  };

  render() {
    let entryForm;

    let submitButton;

    let errorMessage;

    if (this.state.showError && !this.state.winner) {
      errorMessage = <p className={this.state.formDisabled}>Select full bracket before submitting</p>;
    } else {
      errorMessage = null;
    }

    if (this.state.winner) {
      submitButton = <button type="submit">Submit</button>;
    } else {
      submitButton = (
        <button
          type="button"
          onClick={this.formDisabled}
        >
          Submit
        </button>
      );
    }

    if (this.state.submitted) {
      entryForm = (
        <div className="entry-form thanks">
          <h2>✭ THANKS FOR YOUR SUBMISSION! ✭</h2>
        </div>
      );
    } else {
      entryForm = (
        <div className="entry-form">
          <p>
            <label htmlFor="form_name">Name:</label>
            <input
              id="form_name"
              type="text"
              name="entry.2024013681"
              value={this.state.userName}
              required
            />
          </p>
          <p>
            <label htmlFor="form_email">Email:</label>
            <input
              id="form_email"
              type="text"
              name="entry.1459425953"
              value={this.state.userEmail}
              required
            />
          </p>
          <p>
            <label htmlFor="form_instagram">Instagram Username:</label>
            <input
              id="form_instagram"
              type="text"
              name="entry.773442860"
              value={this.state.userInstagram}
              required
            />
          </p>
          <div class="buttons">
            {errorMessage}
            {submitButton}
            <button onClick={this.formReset}>Reset</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <img
          className="header-image"
          src="tre-logo.png"
        ></img>
        {/* <span class="instructions">
          ✭ Bracket submissions are closed. Follow&nbsp;
          <a href="https://www.instagram.com/thebuntlive">@thebuntlive</a> to vote! ✭
        </span> */}
        <iframe
          name="hidden_iframe"
          id="hidden_iframe"
          style={{ display: "none" }}
        ></iframe>
        <form
          action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfoyJAbXuQpKPW9tBXygjm1l33YmguzwrvXYgIOAAKMiK6C1w/formResponse?embedded=true"
          method="post"
          encType="multipart/form-data"
          target="hidden_iframe"
          onSubmit={this.formSubmit.bind(this)}
        >
          <div className="container">
            <div className="row">
              <div className="column round-container roundOne">
                {this.state.matchesRoundOne.map((match, i) => (
                  <Match
                    round={1}
                    clicked={this.handleSkaterClick}
                    match={this.state.matchesRoundOne[i]}
                    index={i}
                  ></Match>
                ))}
              </div>
              <div className="column round-container three wide roundTwo">
                {this.state.matchesRoundTwo.map((match, i) => (
                  <Match
                    round={2}
                    clicked={this.handleSkaterClick}
                    match={this.state.matchesRoundTwo[i]}
                    index={i}
                  ></Match>
                ))}
              </div>
              <div className="column round-container three wide roundThree">
                {this.state.matchesRoundThree.map((match, i) => (
                  <Match
                    round={3}
                    clicked={this.handleSkaterClick}
                    match={this.state.matchesRoundThree[i]}
                    index={i}
                  ></Match>
                ))}
              </div>
              <div className="column round-container three wide roundFour">
                {this.state.matchesRoundFour.map((match, i) => (
                  <Match
                    round={4}
                    clicked={this.handleSkaterClick}
                    match={this.state.matchesRoundFour[i]}
                    index={i}
                  ></Match>
                ))}
              </div>
              <div className="column round-container three wide winnerRound">
                <img
                  className="trophy"
                  src="tre-trophy.png"
                ></img>
                <span className="winner">{this.state.winner}</span>
              </div>
            </div>
          </div>

          <div className="tripleStar">
            <span>✭</span>
            <span>✭</span>
            <span>✭</span>
          </div>
          {entryForm}
          {/* <div className="entry-form">
            <h2>Bracket submissions are closed.</h2>
          </div> */}

          <div className="tripleStar">
            <span>✭</span>
            <span>✭</span>
            <span>✭</span>
          </div>
          <div className="rules">
            <h1 class="college">Official Rules</h1>
            <h2>✭ One entry per person. ✭</h2>
            <h2>✭ Voting 8AM-10PM EST on @thebuntlive. ✭</h2>
            <h2>✭ You must listen to The Bunt. ✭</h2>
            <h2></h2>
          </div>
          <img
            className="sponsor-logos"
            src="tre-logos.png"
          ></img>
        </form>
      </div>
    );
  }
}

export default App;
