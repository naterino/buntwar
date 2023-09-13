import React, { Component } from "react";
import Button from "./Button";

class Match extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  state = {
    enabled: true,
    text: "poopoo",
    winner: null,
  };

  handler(skater) {
    this.setState({
      enabled: false,
      winner: skater,
    });
  }

  render() {
    return (
      <div className="match-container">
        <input
          name={this.props.match.inputName}
          type="hidden"
          value={this.state.winner}
        />
        <Button
          skaterHandler={this.props.clicked}
          target={this.props.match.target}
          index={this.props.index}
          round={this.props.round}
          text={this.props.match.skater1}
          // enabled={false}
          enabled={this.state.enabled && !!this.props.match.skater1 && !!this.props.match.skater2}
          onClick={this.handler}
        ></Button>
        <Button
          skaterHandler={this.props.clicked}
          target={this.props.match.target}
          index={this.props.index}
          round={this.props.round}
          text={this.props.match.skater2}
          // enabled={false}
          enabled={this.state.enabled && !!this.props.match.skater1 && !!this.props.match.skater2}
          onClick={this.handler}
        ></Button>
      </div>
    );
  }
}

export default Match;
