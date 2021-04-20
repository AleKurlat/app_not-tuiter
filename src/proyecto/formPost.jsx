import axios from 'axios';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

export default function FormPost(props){

    const url = props.dominio + "api/posteos";
    const [posteo, setPosteo] = useState("");
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();

    function cambiarValorInput(e) {        
        setPosteo(e.target.value);
    };

    async function guardarForm(e){            
        try{
            const objPosteo ={
                body: posteo,
                id_user: usuario.id
            } 
            const postear = await axios.post(url, objPosteo);          
            if (postear.status===200) {
                console.log(postear.data);
                setPosteo("");
                dispatch({type: 'MODIFICAR_POSTEOS'});
            }}

        catch(e){alert(e.response.data.message);}    
    }

    return(
        <div className="Card">

        <div><textarea type="text" onChange={cambiarValorInput} value={posteo} name="posteo" maxLength="280" rows="6" cols="50"></textarea></div>
        <div><div onClick={guardarForm} className="boton">Enviar post</div></div>
        </div>
    )
}