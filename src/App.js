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
  let dominio;
  console.log(process.env);
  if (process.env.NODE_ENV === 'production'){
    dominio = "https://not-tuiter-api.herokuapp.com/"
  } else {
    dominio = "http://localhost:3001/";
  }    

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
          <div className="logoApp">
            <h1>Not tw*tt*r</h1>
            <img src={logo} className="App-logo" alt="logo" style={{"margin-bottom":"5px"}} />
            <h5 style={{"margin-bottom":"10px"}}><span style={{"color": "rgb(119 197 245)"}}>Ale K.</span></h5>
          </div>
          <div className="noCelu">App con objetivo de práctica de REACT.JS y NODE/EXPRESS</div>
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
