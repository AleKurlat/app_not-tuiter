import logo from './logo.svg';
import './App.css';
import Principal from "./proyecto/principal.jsx";
import Login from "./proyecto/login.jsx"; // importo página LOGIN
import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import {useSelector} from 'react-redux';

function App() {
  
  const token = useSelector((estado) => estado.token);

  function checkAuth(){
    if (token) {
        return (<Principal />);
    } else {
        return(<Login />);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Router>
          <Route exact path="/" render={checkAuth} />
        </Router>
      </header>
    </div>
  );
}

export default App;
