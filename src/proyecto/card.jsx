import './card.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

export default function Card(props){ 

    const dispatch = useDispatch();
    const listadoUsuarios = useSelector((estado) => estado.listadoUsuarios);
    let autorPosteo = listadoUsuarios.find(elem => {return (elem.id === props.datos.id_user)});
    const urlPosteo = props.url + "/" + props.datos.id;
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const usuario = useSelector((estado) => estado.usuario);

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

    async function editarPosteo(){
        try{ 
            const editar = await axios.put(urlPosteo, opciones);          
            if (editar.status===200) {
                console.log(editar.data);
                dispatch({type: 'MODIFICAR_POSTEOS'});    
            }
        }

        catch(e){alert(e.response.data.message);}    
    }   

    let areaModificacion = "";
    if(usuario.id === props.datos.id_user){
        areaModificacion =
        <>
        <div><div onClick={editarPosteo} className="boton">Editar post</div></div>
        <div><div onClick={borrarPosteo} className="boton">Borrar post</div></div>
        </> 
        
    }                 
    
    return(
        <div className="Card">
            <div className="datosPost"><span >{autorPosteo.usuario}</span><span>{props.datos.fecha}</span></div>
            <div><div className="posteo">{props.datos.body}</div></div>
            {areaModificacion}
        </div>
    )
}