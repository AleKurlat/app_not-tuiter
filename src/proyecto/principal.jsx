import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from './card.jsx';
import FormPost from './formPost.jsx';

export default function Principal(props) {

    const dominio = props.dominio;    
    const ruta = 'api/posteos';
    const url =  dominio + ruta;
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const listadoPosteos = useSelector((estado) => estado.listadoPosteos);
    const modificarPosteos = useSelector((estado) => estado.modificarPosteos);

    useEffect(() => {
        async function traerListado(){    
            try{
                const resp = await axios.get(url, opciones);            
                if (resp.status===200) {
                    dispatch({type: "GUARDAR_LISTADO", listado: resp.data, tipoListado:"listadoPosteos"});
                }
            }
            catch(e){(alert(e.response.data.Error))};
        }

        traerListado();    
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modificarPosteos]);
 
    let listadoMapeado = ""
    if(listadoPosteos){
        if(!listadoPosteos[0]){
            listadoMapeado = "Todavía no hay posteos";
        } else {
            listadoMapeado = listadoPosteos.map((unElemento, i) => 
            <Card datos={unElemento} key={i} url={url}/>)
            listadoMapeado.reverse();
        }
    } else {    
        listadoMapeado = "Cargando datos...";
    }

    return (
        <div>
            <FormPost dominio={dominio}/>
            {listadoMapeado}
        </div>        
    )
} 