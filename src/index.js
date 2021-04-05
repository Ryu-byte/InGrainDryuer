import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers'
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(
    reducers,
    {cards: [
            {id: 1, title: 'Пример 1', value: false, isActive: false},
            {id: 2, title: 'Пример 2', value: false, isActive: false},
            {id: 3, title: 'Пример 3', value: '15512341', isActive: false},
            {id: 4, title: 'Пример 4', value: '123123', isActive: false}
        ]},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
ReactDOM.render(
  <Provider store={store}>
    <App store = {store.getState()} />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
