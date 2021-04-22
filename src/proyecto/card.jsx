import './card.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import React, {useState} from 'react';

export default function Card(props){ 

    const dispatch = useDispatch();
    const urlPosteo = props.url + "/" + props.datos.id;
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const usuario = useSelector((estado) => estado.usuario);
    const [esEditar, setEsEditar] = useState(false);
    const [bodyEditando, setBodyEditando] = useState(props.datos.body);

    async function borrarPosteo(){
        try{ 
            const borrar = await axios.delete(urlPosteo, opciones);          
            if (borrar.status===200) {
                dispatch({type: 'MODIFICAR_POSTEOS'});    
            }
        }
        catch(e){alert(e.response.data.Error);}    
    }    

    async function guardarEdicion(){
        try{ 
            const objEditado = {body: bodyEditando};
            const editar = await axios.put(urlPosteo, objEditado, opciones);          
            if (editar.status===200) {
                setEsEditar(false);
                dispatch({type: 'MODIFICAR_POSTEOS'});    
            }
        }
        catch(e){
            alert(e.response.data.Error);
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
        <div><textarea maxLength="280" rows="6" cols="50" className="posteo" value = {bodyEditando} onChange= {cambiarValorInput}></textarea></div>
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
        avisoEditado = <div><div className="posteo">Este post fue editado {formatearFechas(props.datos.editado)}</div></div>
        formatearFechas(props.datos.editado);
    }

    return(
        <div className="Card">
            <div className="datosPost"><span >{props.datos.usuario}</span><span>{formatearFechas(props.datos.fecha)}</span></div>
            {cuerpoDelMensaje}
            {avisoEditado}
            {areaModificacion}
        </div>
    )
}