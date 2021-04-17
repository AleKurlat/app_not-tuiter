import { createStore } from 'redux';

const estadoInicial = {
    token:""
}

function reducer(state = estadoInicial, action) {

    const nuevoEstado = JSON.parse(JSON.stringify(state))

    switch (action.type) {        

        case 'GUARDAR_TOKEN':
            nuevoEstado.token="";
            return nuevoEstado;

        default:
            return state;            
    }
}

export default createStore(reducer);