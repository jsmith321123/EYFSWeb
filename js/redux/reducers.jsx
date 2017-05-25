const initialState = {
	test: 0,
}

export const app = (state = initialState, action) => {
	switch(action.type){
		case "TEST":
			return Object.assign({}, state, {test: action.index});
		default:
			return state;
	}
}