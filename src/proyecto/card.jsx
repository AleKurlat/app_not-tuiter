import './card.css';
import {useSelector} from 'react-redux';

export default function Card(props){ 

    const listadoUsuarios = useSelector((estado) => estado.listadoUsuarios);
    let autorPosteo = listadoUsuarios.find(elem => {return (elem.id === props.datos.id_user)});
    
        return(
            <div className="Card">
                <div>Autor: <span className="dato">{autorPosteo.usuario}</span></div>
                <div>Fecha: <span className="dato">{props.datos.fecha}</span></div>
                <div>Post: <span className="dato">{props.datos.body}</span></div>

            </div>
            )
}