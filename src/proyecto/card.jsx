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
                console.log(borrar.data);
                dispatch({type: 'MODIFICAR_POSTEOS'});    
            }
        }
        catch(e){alert(e.response.data.message);}    
    }    

    async function guardarEdicion(){
        try{ 
            const objEditado = {body: bodyEditando}
            const editar = await axios.put(urlPosteo, objEditado, opciones);          
            if (editar.status===200) {
                console.log(editar.data);
                setEsEditar(false);
                dispatch({type: 'MODIFICAR_POSTEOS'});    
            }
        }
        catch(e){alert(e.response.data.message);}    
    } 

    function cambiarValorInput(e) {        
        setBodyEditando(e.target.value);
    };
    
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

    return(
        <div className="Card">
            <div className="datosPost"><span >{props.datos.usuario}</span><span>{props.datos.fecha}</span></div>
            {cuerpoDelMensaje}
            {areaModificacion}
        </div>
    )
}