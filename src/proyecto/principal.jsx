import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from './card.jsx';
import FormPost from './formPost.jsx';
import loading from "./loading.svg";

export default function Principal(props) {

    const dominio = props.dominio;    
    const ruta = 'api/posteos';
    const url =  dominio + ruta;
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const listadoPosteos = useSelector((estado) => estado.listadoPosteos);
    const refrescarPosteos = useSelector((estado) => estado.refrescarPosteos);
    const [displayLoading, setDisplayLoading] = useState();

    useEffect(() => {
        async function traerListado(){    
            try{
                setDisplayLoading("block");
                const resp = await axios.get(url, opciones);            
                if (resp && resp.status===200) {
                    dispatch({type: "GUARDAR_LISTADO", listado: resp.data, tipoListado:"listadoPosteos"});
                    setDisplayLoading("none");
                }
            }
            catch(e){
                if(e.response){alert(e.response.data.Error)} else {console.log(e)}
            };
        }

        traerListado();    
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refrescarPosteos]);
 
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
        listadoMapeado = "Cargando posteos";
    }

    return (
        <div>
            <FormPost dominio={dominio} setDisplayLoading={setDisplayLoading}/>
            <img src={loading} alt="esperando" style={{"display": displayLoading, "margin-left": "auto", "margin-right": "auto"}}></img>
            {listadoMapeado}
        </div>        
    )
} 