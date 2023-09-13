import React, { Component } from "react";

class Button extends Component {
	render() {
		return (
			<button
				className={this.props.enabled ? "enabled" : ""}
				disabled={!this.props.enabled}
				onClick={(event) => {
					this.props.skaterHandler(
						this.props.round,
						this.props.text,
						this.props.target,
						this.props.index
					);
					this.props.onClick(this.props.text);
					// this.onClick();
				}}>
				{this.props.text}
			</button>
		);
	}
}

export default Button;
