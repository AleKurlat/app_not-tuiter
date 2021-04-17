import './card.css';

export default function Card(props){ 

    function listarPropiedades(elemento) {        
        return Object.entries(elemento).map((el, i) => {
        return (<div key={i}><span>{el[0]}: </span><span className="dato">{el[1]}</span></div>)
    })}
    
        return(
            <div className="Card">
                {listarPropiedades(props.datos)}
            </div>
            )
}