export const SET_USER = "SET_USER";
export const SET_PAGE = "SET_PAGE";


const initialState = {
	user: undefined,
	page: undefined,
}

export const app = (state = initialState, action) => {
	switch(action.type){
		case SET_USER:
			return Object.assign({}, state, {user: action.user});
		case SET_PAGE:
			return Object.assign({}, state, {page: action.page_component})
		default:
			return state;
	}
}