import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from './card.jsx';
import {Link} from "react-router-dom";

export default function Principal(props) {

    const dominio = props.dominio;    
    const ruta = '';
    const url =  dominio + ruta;
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const listado = useSelector((estado) => estado.listado);

    useEffect(() => {
        async function traerListado(){    
            try{
                const opciones = {
                    headers: {
                        Authorization: token 
                    }
                }

                const resp = await axios.get(url, opciones);            
                if (resp.status===200) {
                    dispatch({type: "GUARDAR_LISTADO", listado: resp.data});
                }
            }
            catch(e){dispatch(console.log(e.response.data.message))};
        }

        traerListado();        
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);  
 
    let listadoMapeado = "Cargando datos...";
    if(listado[0]){listadoMapeado = listado.map((unElemento, i) => 
        <Card datos={unElemento} key={i} url={url}/>)}

    function desloguear(){
        dispatch({type: 'GUARDAR_TOKEN', token: ""});
    }

    return (
        <div>
            <h1>Listado</h1>
            {listadoMapeado}
            <div><div className="boton" onClick={desloguear}>Cerrar sesión de este usuario</div></div>
            <div><div className="boton"><Link to="/registro">Registrar nuevo usuario</Link></div></div>

        </div>        
    )
} 