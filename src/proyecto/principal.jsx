import axios from 'axios';
import { useEffect } from 'react';
import Login from "./login.jsx"; // importo página LOGIN
import {useDispatch, useSelector} from 'react-redux';

export default function Principal() {

    const url = "http://localhost:3000/";   

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
            catch(e){dispatch({type: "GUARDAR_LISTADO", listado: e.response.data.message})}
        }

        traerListado();
        
               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]); 
 
    return (
        <div>
            <h1>Listado</h1>
            {listado}
            <Login />
        </div>
        
    )
} 