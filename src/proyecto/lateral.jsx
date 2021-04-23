import {useSelector, useDispatch} from 'react-redux';

export default function Lateral(){

    const usuario = useSelector((estado) => estado.usuario);     
    const dispatch = useDispatch();

    function desloguear(){
        dispatch({type: 'GUARDAR_TOKEN', token: ""});
    }    

    return(
        <div className="areaUsuario">
            <div><h3 className="info">Bienvenidx {usuario.usuario}</h3></div>
            <div className="boton" onClick={desloguear}>Cerrar sesión</div>
            <div className="boton" onClick={()=>{dispatch({type: "REFRESCAR_POSTEOS"})}}>Refrescar posteos</div>
        </div>
    )
}