import React from 'react';

export class AppComponent extends React.Component {
	render() {
		const Page = this.props.page;

		return (
			<div><Page store={this.props.store}/></div>
		);
	}
}