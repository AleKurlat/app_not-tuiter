import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

export default function Login() {

    const url = "http://localhost:3000/login";
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
            }}

        catch(e){alert(e.response.data.message);}    
    }

    return (
        <div className="Card">
            <h1>Ingresar usuario y clave</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objLogin.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objLogin.clave} name="clave"></input></div>
            <div><div onClick={guardarForm} className="boton">Guardar</div></div>
        </div>
    )
} 