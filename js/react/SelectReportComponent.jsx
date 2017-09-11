import React from 'react';
import {getReportList} from './../getReportList.jsx';
import {ShowReportComponent} from './ShowReportComponent.jsx';

export class SelectReportComponent extends React.Component {
	showReports() {
		let rpts = this.props.store.getState().reports;
		let comps = [];

		for (let i = 0; i < rpts.length; i++) {
			comps.push(<p key={i} onClick={() => {this.setReport(rpts[i])}}>{rpts[i]}</p>);
		}

		return comps;
	}

	setReport(report_name) {
		this.props.store.dispatch({type: "SET_REPORT_NAME", report_name: report_name});
		this.props.store.dispatch({type: "SET_PAGE", page_component: ShowReportComponent});
	}

	render () {
		if (!this.props.store.getState().reports_loading) {
			this.props.store.dispatch({type: "SET_REPORTS_LOADING", bool: true});
			getReportList(this.props.store);
		}
		

		return (
			<div>
				{this.showReports()}
			</div>
		)
	}
}