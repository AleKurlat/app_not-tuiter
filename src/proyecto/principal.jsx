import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from './card.jsx';
import {Link} from "react-router-dom";

export default function Principal(props) {

    const dominio = props.dominio;    
    const ruta = 'api/posteos';
    const url =  dominio + ruta;
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const listadoPosteos = useSelector((estado) => estado.listadoPosteos);
    const listadoUsuarios = useSelector((estado) => estado.listadoUsuarios);
    const modificarPosteos = useSelector((estado) => estado.modificarPosteos);
    const modificarUsuarios = useSelector((estado) => estado.modificarUsuarios);

    useEffect(() => {
        async function traerListado(){    
            try{
                const resp = await axios.get(url, opciones);            
                if (resp.status===200) {
                    dispatch({type: "GUARDAR_LISTADO", listado: resp.data, tipoListado:"listadoPosteos"});
                }
            }
            catch(e){(console.log(e.response.data.message))};
        }

        traerListado();    
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modificarPosteos]);  

    useEffect(() => {
        async function traerListado(){    
            try{
                const resp = await axios.get((dominio + "api/usuarios"), opciones);
                if (resp.status===200) {
                    dispatch({type: "GUARDAR_LISTADO", listado: resp.data, tipoListado:"listadoUsuarios"});
                }
            }
            catch(e){(console.log(e.response.data.message))};
        }

        traerListado();        
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modificarUsuarios]); 

 
    let listadoMapeado = "Cargando datos...";
    if(listadoPosteos[0] && listadoUsuarios[0]){listadoMapeado = listadoPosteos.map((unElemento, i) => 
        <Card datos={unElemento} key={i} url={url}/>)}

    function desloguear(){
        dispatch({type: 'GUARDAR_TOKEN', token: ""});
        dispatch({type: 'GUARDAR_USUARIO', usuario: {        
            id: "",
            usuario: "",
            clave:"",
            email:"",
            cel:""}});
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