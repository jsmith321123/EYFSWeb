import React from "react";

export class GraphComponent extends React.Component {
	drawAxis() {
		
	}

	render () {
		return (
			<canvas id={this.props.name}></canvas>
		)
	}
}