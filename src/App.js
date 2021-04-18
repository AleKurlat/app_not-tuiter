import logo from './logo.svg';
import './App.css';
import Principal from "./proyecto/principal.jsx";
import Login from "./proyecto/login.jsx"; // importo página LOGIN
import Registro from "./proyecto/formRegistro.jsx";
import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import {useSelector} from 'react-redux';

function App() {
  
  const token = useSelector((estado) => estado.token);
  const usuario = useSelector((estado) => estado.usuario);
  const dominio = "http://localhost:3001/";

  function checkAuth(){
    if (token) {
        return (<Principal dominio={dominio} />);
    } else {
        return(<Login dominio={dominio}/>);
    }
  }

  function registroConProps(){
    return (<Registro dominio={dominio}/>)
  } 

  let areaUsuario = "Por favor ingresá con un usuario";
  if(token) {areaUsuario = "Bienvenido " + usuario.usuario};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {areaUsuario}
        <Router>
          <Route exact path="/" render={checkAuth} />
          <Route exact path="/registro" render={registroConProps}  />
        </Router>
      </header>
    </div>
  );
}

export default App;
