import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import loading from "./loading.svg";

export default function Login(props) {

    const dominio = props.dominio;
    const ruta = "api/login";
    const url = dominio + ruta;
    const dispatch = useDispatch();
    const [objLogin, setObjLogin] = useState({
        usuario: "",
        clave:""
    });

    let displayLoading = "none";

    function cambiarValorInput(e) {        
        setObjLogin({...objLogin, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{ 
            displayLoading = "block";
            const loguear = await axios.post(url, objLogin);          
            if (loguear.status===200) {
                dispatch({type: 'GUARDAR_TOKEN', token: loguear.data.token});            
            }
        }

        catch(e){
            if(e.response){alert(e.response.data.Error)} else {console.log(e)};
        }    
    }

    

    return (
        <div className="Card">
            <img src={loading} alt="esperando" style={{"display": displayLoading, "margin-left": "auto", "margin-right": "auto"}}></img>
            <h1>Ingresar usuario y clave</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objLogin.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objLogin.clave} name="clave"></input></div>
            <div><div onClick={guardarForm} className="boton">Ingresar</div></div>
            <div><div className="boton"><Link to="/registro">Registrar nuevo usuario</Link></div></div>
        </div>
    )
} 