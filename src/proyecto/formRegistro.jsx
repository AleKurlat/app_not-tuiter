import axios from 'axios';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import loading from "./loading.svg";
import {useDispatch} from 'react-redux';


export default function Registro(props) {

    const dominio = props.dominio;
    const ruta = "api/usuarios";
    const url = dominio + ruta;
    const userVacio = {        
        usuario: "",
        clave:"",
        email:"",
    }
    const [objRegistro, setObjRegistro] = useState(userVacio);
    const [displayLoading, setDisplayLoading] = useState("none");
    const dispatch = useDispatch();

    function cambiarValorInput(e) {        
        setObjRegistro({...objRegistro, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{
            setDisplayLoading("block"); 
            const registrar = await axios.post(url, objRegistro);          
            if (registrar && registrar.status===200) {
                setDisplayLoading("none");
                alert("Usuario guardado correctamente");
                setObjRegistro(userVacio);
                props.varios.history.push("/");
            }}

        catch(e){
            setDisplayLoading("none");
            if(e.response){
                if(e.response.status === 403){
                    dispatch({type: 'GUARDAR_TOKEN', token: ""});
                    alert("La sesión almacenada caducó o es inválida, iniciar nueva sesión");
                } else {
                    console.log(e.response.data.Error);
                }
            } else {alert("Error en la solicitud al servidor")};        }    
    }

    return (
        <div className="Card">
            <img src={loading} alt="esperando" style={{"display": displayLoading, "margin-left": "auto", "margin-right": "auto"}}></img>
            <h1>Registrar datos de usuario</h1>
            <div><div>Usuario: </div><input type="text" onChange={cambiarValorInput} value={objRegistro.usuario} name="usuario"></input></div>
            <div><div>Contraseña: </div><input type="password" onChange={cambiarValorInput} value={objRegistro.clave} name="clave"></input></div>
            <div><div>Email: </div><input type="email" onChange={cambiarValorInput} value={objRegistro.email} name="email"></input></div>
            <div><div onClick={guardarForm} className="boton">Guardar usuario</div></div>
            <div><div className="boton"><Link to="/">Volver a página principal</Link></div></div>
        </div>
    )
} 