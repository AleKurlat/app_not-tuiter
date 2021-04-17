import axios from 'axios';
import React, {useState} from 'react';

export default function Login() {

    const url = "http://localhost:3000/login";

    const [objLogin, setObjLogin] = useState({
        usuario: "",
        clave:""
    });

    function cambiarValorInput(e) {        
        setObjLogin({...objLogin, [e.target.name]:e.target.value});
    };

    async function guardarForm(e){            
        try{ 
            console.log(objLogin);
            const loguear = await axios.post(url, objLogin);          
            if (loguear.status===200) {
                alert(loguear.data);
            }}

        catch(e){alert(e.response.data.Error);}    
    }

    return (
        <div>
            hola
            <div><input type="text" onChange={cambiarValorInput} value={objLogin.usuario} name="usuario"></input></div>
            <div><input type="text" onChange={cambiarValorInput} value={objLogin.clave} name="clave"></input></div>
            <div><div onClick={guardarForm} className="boton">Guardar</div></div>
        </div>
    )
} 