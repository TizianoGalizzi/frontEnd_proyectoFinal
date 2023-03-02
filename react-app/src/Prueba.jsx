    import { useState, useEffect } from "react";

    
 function Prueba (){
        const [valor, setValor] = useState("");
    
        useEffect((Event)=>{
            useState(EventTarget.value)
        },[valor]);
        
        console.log(valor)
        return(
            <>
            <h1>Escribi algo en el input:</h1>
            <input type="text" value={valor} />
            </>
        )
    }
    

export default  Prueba;