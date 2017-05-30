import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

import {app, SET_USER, SET_PAGE} from './redux/reducers.jsx';

import {AppComponent} from './react/AppComponent.jsx';
import {LoginComponent} from './react/LoginComponent.jsx';

var renderApp = (str) => {
	ReactDOM.render(
		<AppComponent page={store.getState().page} store={str} />,
		document.getElementById("app")
	)
}

var store = createStore(app);

console.log(store.getState());

store.subscribe(() => {
	console.log("");
	console.log("CHANGE!");
	console.log(store.getState());
	console.log("");
});

store.subscribe(() => {
	renderApp(store);
})

store.dispatch({type: SET_PAGE, page_component: LoginComponent});
