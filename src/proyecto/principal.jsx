import axios from 'axios';

export default function Principal() {

    const url = "http://localhost:3000/";

    const opciones = {
        headers: {
            "Authorization": "BEARER <token>"
        }
    }

    axios.get(url, opciones);

    return (
        <div>hola</div>
    )
} 