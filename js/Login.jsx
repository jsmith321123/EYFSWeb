import {SelectReportComponent} from './react/SelectReportComponent.jsx';

export var login = (store, user) => {
	//login the user inputted
	store.dispatch({type: "SET_USER", user: user});
	store.dispatch({type: "SET_PAGE", page_component: SelectReportComponent});
}