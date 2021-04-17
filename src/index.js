import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import { Provider } from 'react-redux'; // necesario para redux
import store from './store/store'; // necesario para redux
//import Login from "./proyecto/login.jsx"; // importo página LOGIN

/*
function checkAuth(){
  var token = store.gestState().token;
  console.log(token);
  if (token) {
      return (console.log("estas logueado"));
  } else {
      return(console.log("no estas logueado"));
  }
}


y abajo en la ruta "/" iría render={checkAuth}

<Provider store={store}>
  <Router>
    <Route exact path="/" component={App}  />
    <Route path ="/login" component={Login}  />
  </Router>
</Provider>
*/



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
