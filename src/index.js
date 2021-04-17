import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import { Provider } from 'react-redux'; // necesario para redux
import store from './store/store'; // necesario para redux
import Login from "./proyecto/login.jsx"; // importo página LOGIN

function checkAuth(){
  var token = store.gestState().token;
  if (token) {
      return (console.log("estas logueado"));
  } else {
      return(console.log("no estas logueado"));
  }
}

<Provider store={store}>
  <Router>
    <Route exact path="/" component={App} render={checkAuth} />
    <Route component={Login} path ="/login" />
  </Router>
</Provider>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
