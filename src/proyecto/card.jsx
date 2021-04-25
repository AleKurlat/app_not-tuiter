import './card.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import React, {useState} from 'react';
import loading from "./loading.svg";

export default function Card(props){ 

    const dispatch = useDispatch();
    const urlPosteo = props.url + "/" + props.datos.id;
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const usuario = useSelector((estado) => estado.usuario);
    const [esEditar, setEsEditar] = useState(false);
    const [bodyEditando, setBodyEditando] = useState(props.datos.body);
    const [displayLoading, setDisplayLoading] = useState("none");

    async function borrarPosteo(){
        try{
            setDisplayLoading("block"); 
            const borrar = await axios.delete(urlPosteo, opciones);          
            if (borrar && borrar.status===200) {
                setDisplayLoading("none");
                dispatch({type: 'REFRESCAR_POSTEOS'});    
            }
        }
        catch(e){
            setDisplayLoading("none");
            if(e.response){alert(e.response.data.Error)} else {alert("Falló la conexión con el servidor")};
        }    
    }    

    async function guardarEdicion(){
        try{
            setDisplayLoading("block"); 
            const objEditado = {body: bodyEditando};
            const editar = await axios.put(urlPosteo, objEditado, opciones);          
            if (editar && editar.status===200) {
                setEsEditar(false);
                setDisplayLoading("none"); 
                dispatch({type: 'REFRESCAR_POSTEOS'});    
            }
        }
        catch(e){
            setDisplayLoading("none");
            if(e.response){alert(e.response.data.Error)} else {alert("Falló la conexión con el servidor")};
            setBodyEditando(props.datos.body);            
        }    
    } 

    function cambiarValorInput(e) {        
        setBodyEditando(e.target.value);
    };
    
    function formatearFechas(fecha){
        const date = new Date(fecha)
        return(date.toLocaleString())}

    let cuerpoDelMensaje = "";
    if(esEditar === false) {
        cuerpoDelMensaje = <div><div className="posteo">{props.datos.body}</div></div>
    } else {
        cuerpoDelMensaje = 
        <>
        <div><textarea maxLength="280" className="posteo" value = {bodyEditando} onChange= {cambiarValorInput}></textarea></div>
        <div><div onClick={guardarEdicion} className="boton">Guardar cambios</div></div>
        <div><div onClick={() => {setEsEditar(false)}} className="boton">Cancelar</div></div>
        </>
    }

    let areaModificacion = "";
    if(usuario.user_id === props.datos.id_user && esEditar === false){
        areaModificacion =
        <>
        <div><div onClick={() => {setEsEditar(true)}} className="boton">Editar post</div></div>
        <div><div onClick={borrarPosteo} className="boton">Borrar post</div></div>
        </>        
    }    

    let avisoEditado = "";
    if (props.datos.editado != null){
        avisoEditado = <div><div className="datosPost">Este post fue editado {formatearFechas(props.datos.editado)}</div></div>
        formatearFechas(props.datos.editado);
    }

    return(
        <div className="Card">
            <div className="datosPost"><span className ="info">{props.datos.usuario}</span><span className ="info">{formatearFechas(props.datos.fecha)}</span></div>
            {cuerpoDelMensaje}
            {avisoEditado}
            <img src={loading} alt="esperando" style={{"display": displayLoading, "margin-left": "auto", "margin-right": "auto", "width": "40px"}}></img>
            {areaModificacion}
        </div>
    )
}