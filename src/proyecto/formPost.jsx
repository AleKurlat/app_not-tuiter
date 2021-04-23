import axios from 'axios';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

export default function FormPost(props){

    const url = props.dominio + "api/posteos";
    const [posteo, setPosteo] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};

    function cambiarValorInput(e) {        
        setPosteo(e.target.value);
    };

    async function guardarForm(e){            
        try{
            const objPosteo ={body: posteo}; 
            const postear = await axios.post(url, objPosteo, opciones);          
            if (postear.status===200) {
                setPosteo("");
                dispatch({type: 'REFRESCAR_POSTEOS'});
            }}

        catch(e){alert(e.response.data.Error);}    
    }

    return(
        <div className="Card">
        <div><textarea type="text" onChange={cambiarValorInput} value={posteo} name="posteo" maxLength="280" rows="4" cols="50" placeholder="Escribí algo acá..."></textarea></div>
        <div><div onClick={guardarForm} className="boton">Enviar post</div></div>
        </div>
    )
}