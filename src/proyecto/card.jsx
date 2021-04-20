import './card.css';
import {useSelector} from 'react-redux';

export default function Card(props){ 

    const listadoUsuarios = useSelector((estado) => estado.listadoUsuarios);
    let autorPosteo = listadoUsuarios.find(elem => {return (elem.id === props.datos.id_user)});
    
        return(
            <div className="Card">
                <div className="datosPost"><span >{autorPosteo.usuario}</span><span>{props.datos.fecha}</span></div>
                <div><div className="posteo">{props.datos.body}</div></div>

            </div>
            )
}