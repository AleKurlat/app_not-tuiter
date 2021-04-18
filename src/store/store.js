import { createStore } from 'redux';

const estadoInicial = {
    token:"",
    listado: [],
    usuario: {}
}

function reducer(state = estadoInicial, action) {

    const nuevoEstado = JSON.parse(JSON.stringify(state));

    switch (action.type) {        

        case 'GUARDAR_TOKEN':
            nuevoEstado.token=action.token;
            return nuevoEstado;

        case "GUARDAR_LISTADO":
            nuevoEstado.listado=action.listado;
            return nuevoEstado;

        case "GUARDAR_USUARIO":
            nuevoEstado.usuario=action.usuario;
            return nuevoEstado;

        default:
            return state;            
    }
}

export default createStore(reducer);