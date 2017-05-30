import React from 'react';

export class PlaceholderComponent extends React.Component {
	render () {
		return (
			<p>Welcome {this.props.store.getState()["user"]}!</p>
		)
	}
}