import React from 'react';
import {getReport} from '../getReport.jsx';
import {GraphComponent} from "./GraphComponent.jsx";

export class ShowReportComponent extends React.Component {
	getReport() {
		let report = this.props.store.getState().report;

		if (report == undefined) {
			return(<p>Report loading...</p>);
		} else {
			this.areas = report.areas;
		}
	}

	generateGraphs() {
		this.getReport();

		if (this.areas == undefined) {
			return(<p>Report loading...</p>);
		}

		let graph_name = "graph_" + this.areas[0].title.replace(" ", "_").toLowerCase();

		return <GraphComponent name={graph_name} values={this.areas[0].ranges}/>;
	}

	render () {
		if (!this.props.store.getState().report_loading) {
			this.props.store.dispatch({type: "SET_REPORT_LOADING", bool: true});
			getReport(this.props.store);
		}

		return (
			<div>
				{this.generateGraphs()}
			</div>
		)
	}
}