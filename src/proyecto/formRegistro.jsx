import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

export default function Registro(props) {

    const dominio = props.dominio;
    const ruta = "registro";
    const url = dominio + ruta;
    const dispatch = useDispatch();
    const [objRegistro, setObjRegistro] = useState({
        usuario: "",
        clave:"",
        email:"",
        cel:""
    });

    function cambiarValorInput(e) {        
        setObjRegistro({...objRegistro, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{ 
            const loguear = await axios.post(url, objRegistro);          
            if (loguear.status===200) {
                dispatch({type: 'GUARDAR_TOKEN', token: loguear.data.token});
                alert("Usuario guardado correctamente");
                setObjRegistro({        
                    usuario: "",
                    clave:"",
                    email:"",
                    cel:""})
            }}

        catch(e){alert(e.response.data.message);}    
    }

    return (
        <div className="Card">
            <h1>Registrar datos de usuario</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objRegistro.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objRegistro.clave} name="clave"></input></div>
            <div><div>Email: </div><input type="email" onChange={cambiarValorInput} value={objRegistro.email} name="email"></input></div>
            <div><div>Cel: </div><input type="tel" onChange={cambiarValorInput} value={objRegistro.cel} name="cel"></input></div>
            <div><div onClick={guardarForm} className="boton">Guardar usuario</div></div>
            <div><div className="boton"><Link to="/">Volver a página principal</Link></div></div>
        </div>
    )
} 