export const SET_USER = "SET_USER";
export const SET_PAGE = "SET_PAGE";
export const SET_REPORTS = "SET_REPORTS";
export const SET_REPORT_NAME = "SET_REPORT_NAME";
export const SET_REPORTS_LOADING = "SET_REPORTS_LOADING";
export const SET_REPORT = "SET_REPORT";
export const SET_REPORT_LOADING = "SET_REPORT_LOADING";


const initialState = {
	user: undefined,
	page: undefined,
	reports: ["Loading reports..."],
	report_name: undefined,
	reports_loading: false,
	report: undefined,
	report_loading: undefined,
}

export const app = (state = initialState, action) => {
	switch(action.type){
		case SET_USER:
			return Object.assign({}, state, {user: action.user});
		case SET_PAGE:
			return Object.assign({}, state, {page: action.page_component});
		case SET_REPORTS:
			return Object.assign({}, state, {reports: action.reports});
		case SET_REPORT_NAME:
			return Object.assign({}, state, {report_name: action.report_name});
		case SET_REPORTS_LOADING:
			return Object.assign({}, state, {reports_loading: action.bool});
		case SET_REPORT:
			return Object.assign({}, state, {report: action.report});
		case SET_REPORT_LOADING:
			return Object.assign({}, state, {report_loading: action.bool});
		default:
			return state;
	}
}