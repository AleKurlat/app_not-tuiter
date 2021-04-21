import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

export default function Registro(props) {

    const dominio = props.dominio;
    const ruta = "api/usuarios";
    const url = dominio + ruta;
    const dispatch = useDispatch();
    const userVacio = {        
        usuario: "",
        clave:"",
        email:"",
    }
    const [objRegistro, setObjRegistro] = useState(userVacio);

    function cambiarValorInput(e) {        
        setObjRegistro({...objRegistro, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{ 
            const registrar = await axios.post(url, objRegistro);          
            if (registrar.status===200) {
                dispatch({type: 'MODIFICAR_USUARIOS'});
                alert("Usuario guardado correctamente");
                setObjRegistro(userVacio);
            }}

        catch(e){alert(e.response.data.message);}    
    }

    return (
        <div className="Card">
            <h1>Registrar datos de usuario</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objRegistro.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objRegistro.clave} name="clave"></input></div>
            <div><div>Email: </div><input type="email" onChange={cambiarValorInput} value={objRegistro.email} name="email"></input></div>
            <div><div onClick={guardarForm} className="boton">Guardar usuario</div></div>
            <div><div className="boton"><Link to="/">Volver a página principal</Link></div></div>
        </div>
    )
} 