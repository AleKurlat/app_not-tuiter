import axios from 'axios';
import Login from "./login.jsx"; // importo página LOGIN

export default function Principal() {

    const url = "http://localhost:3000/";

    const opciones = {
        headers: {
            "Authorization": "BEARER <token>"
        }
    }

    //axios.get(url, opciones);

    return (
        <div>hola
            <Login />
        </div>
        
    )
} 