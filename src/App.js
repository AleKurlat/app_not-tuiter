import logo from './logo.svg';
import './App.css';
import Principal from "./proyecto/principal.jsx";
import Login from "./proyecto/login.jsx"; // importo página LOGIN
import Registro from "./proyecto/formRegistro.jsx";
import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import {useSelector, useDispatch} from 'react-redux';

function App() {
  
  const token = useSelector((estado) => estado.token);
  const usuario = useSelector((estado) => estado.usuario);
  const dominio = "https://not-tuiter-api.herokuapp.com/";
  const dispatch = useDispatch();

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

  function desloguear(){
    dispatch({type: 'GUARDAR_TOKEN', token: ""});
    dispatch({type: 'GUARDAR_USUARIO', usuario: {}});
}

  let areaUsuario = "";
  if(token) {areaUsuario = 
    <div className="areaUsuario">
    <div><h3 className="info">Bienvenidx {usuario.usuario}</h3></div>
    <div><div className="boton" onClick={desloguear}>Cerrar sesión de este usuario</div></div>
    </div>
  };

  return (
    
    <div className="App">
      <div className="fijo">
        <header className="App-header">
          <h3>Not tw*tt*r</h3>
          <img src={logo} className="App-logo" alt="logo" />
          <h5>By ALEK</h5>
          <h6>App con objetivos de práctica de REACT.JS y EXPRESS</h6>
        </header>

        {areaUsuario}
      </div>

      <div className="zonaPosteos">       
        <Router>
          <Route exact path="/" render={checkAuth} />
          <Route exact path="/registro" render={registroConProps}  />
        </Router>
      </div>      
    </div>
  );
}

export default App;
