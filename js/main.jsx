import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

import {app} from './redux/reducers.jsx';

var store = createStore(app);

console.log(store.getState());

store.dispatch({type: "TEST", index: 25});

console.log(store.getState());

import {TestComponent} from './react/TestComponent.jsx'

ReactDOM.render(
	<TestComponent />,
	document.getElementById("test")
)