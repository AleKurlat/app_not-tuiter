import { createStore } from 'redux';

let iniciarToken = "";
let iniciarUsuario = {};
if (localStorage.getItem("token")){
    iniciarToken = localStorage.getItem("token");
    const base64Url = iniciarToken.split('.')[1];
    const base64Decode = Buffer.from(base64Url, "base64");
    iniciarUsuario = JSON.parse(base64Decode);
};

const estadoInicial = {
    token: iniciarToken,
    listadoPosteos: "",
    listadoUsuarios: "",
    usuario: iniciarUsuario,
    refrescarPosteos: 0,
    modificarUsuarios: 0
}

function reducer(state = estadoInicial, action) {

    const nuevoEstado = JSON.parse(JSON.stringify(state));

    switch (action.type) {        

        case 'GUARDAR_TOKEN':
            localStorage.setItem("token", action.token);
            nuevoEstado.token=action.token;
            if(action.token){
                const base64Url = action.token.split('.')[1];
                const base64Decode = Buffer.from(base64Url, "base64");
                nuevoEstado.usuario = JSON.parse(base64Decode);
            } else {
                nuevoEstado.usuario = "";
            }
            
            return nuevoEstado;

        case "GUARDAR_LISTADO":
            nuevoEstado[action.tipoListado]=action.listado;
            return nuevoEstado;

        case "REFRESCAR_POSTEOS":
            nuevoEstado.refrescarPosteos++;
            return nuevoEstado; 

        default:
            return state;            
    }
}

export default createStore(reducer);