import axios from 'axios';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

export default function FormPost(props){

    const url = props.dominio + "api/posteos";
    const [posteo, setPosteo] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((estado) => estado.token);
    const opciones = {headers: {Authorization: token}};
    const setDisplayLoading = props.setDisplayLoading;

    function cambiarValorInput(e) {        
        setPosteo(e.target.value);
    };

    async function guardarForm(e){            
        try{
            setDisplayLoading("block");
            const objPosteo ={body: posteo}; 
            const postear = await axios.post(url, objPosteo, opciones);          
            if (postear && postear.status===200) {
                setPosteo("");
                setDisplayLoading("none");
                dispatch({type: 'REFRESCAR_POSTEOS'});
            }}

        catch(e){
            setDisplayLoading("none");
            if(e.response){
                if(e.response.status === 403){
                    dispatch({type: 'GUARDAR_TOKEN', token: ""});
                    alert("La sesión almacenada caducó o es inválida, iniciar nueva sesión");
                } else {
                    console.log(e.response.data.Error);
                }
            } else {alert("Error en la solicitud al servidor")};
        }    
    }

    return(
        <div className="Card">
        <div><textarea type="text" onChange={cambiarValorInput} value={posteo} name="posteo" maxLength="280" placeholder="Escribí algo acá..."></textarea></div>
        <div><div onClick={guardarForm} className="boton">Enviar post</div></div>
        </div>
    )
}