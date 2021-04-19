import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

export default function Login(props) {

    const dominio = props.dominio;
    const ruta = "api/login";
    const url = dominio + ruta;
    const dispatch = useDispatch();
    const [objLogin, setObjLogin] = useState({
        usuario: "",
        clave:""
    });

    function cambiarValorInput(e) {        
        setObjLogin({...objLogin, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{ 
            const loguear = await axios.post(url, objLogin);          
            if (loguear.status===200) {
                dispatch({type: 'GUARDAR_TOKEN', token: loguear.data.token});
                const opciones = {headers: {Authorization: loguear.data.token}};                
                const usuarioLogueado = await axios.get((dominio + "api/usuarios/user/" + objLogin.usuario),opciones);
                if(usuarioLogueado.status===200) {
                    dispatch({type: 'GUARDAR_USUARIO', usuario: usuarioLogueado.data});
                }                
            }
        }

        catch(e){alert(e.response.data.message);}    
    }

    return (
        <div className="Card">
            <h1>Ingresar usuario y clave</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objLogin.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objLogin.clave} name="clave"></input></div>
            <div><div onClick={guardarForm} className="boton">Ingresar</div></div>
            <div><div className="boton"><Link to="/registro">Registrar nuevo usuario</Link></div></div>

        </div>
    )
} 