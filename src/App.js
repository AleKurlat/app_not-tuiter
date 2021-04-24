import logo from './logo.svg';
import './App.css';
import Principal from "./proyecto/principal.jsx";
import Login from "./proyecto/login.jsx"; // importo página LOGIN
import Registro from "./proyecto/formRegistro.jsx";
import Lateral from "./proyecto/lateral.jsx";
import { BrowserRouter as Router, Route } from 'react-router-dom'; // necesario para redirigir rutas
import {useSelector} from 'react-redux';

function App() {
  
  const token = useSelector((estado) => estado.token); 
  let dominio = ""; 
  if (process.env.NODE_ENV === "development"){
    console.log(process.env);
    dominio = "http://localhost:3001/"  
  } else {
    console.log("operando en servidor remoto");
    dominio = "https://not-tuiter-api.herokuapp.com/";  
  };    

  function checkAuth(props){
    if (token) {
        return (<Principal dominio={dominio} varios={props}/>);
    } else {
        return(<Login dominio={dominio} varios={props}/>);
    }
  }

  let lateral ="";
  if(token){lateral = <Lateral />}  

  return (
    
    <div className="App">
      <div className="fijo">
        <header className="App-header">
          <h3>Not tw*tt*r</h3>
          <img src={logo} className="App-logo" alt="logo" />
          <h5>By ALEK</h5>
          <h6 className="noCelu">App con objetivos de práctica de REACT.JS y EXPRESS</h6>
        </header>        
      </div>

      <div className="contenedor">
        
        {lateral}        

        <div className="zonaPosteos">       
          <Router>
            <Route exact path="/" render={(props)=>{return checkAuth(props)}} />
            <Route exact path="/registro" render={(props) => {return(<Registro dominio={dominio} varios = {props}/>)}}  />
          </Router>
        </div>  

      </div>    
    </div>
  );
}

export default App;
