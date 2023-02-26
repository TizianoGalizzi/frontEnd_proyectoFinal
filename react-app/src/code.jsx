    
    
    
    
    
    
    const [contador, setContador] = useState(1);
    useEffect(()=>{
        console.log("Se actualizo el componente")
    },[contador]);
    
    let value = 'Hola';
    console.log(contador)
    return(
        <>
        <h1>Hola</h1>
        <a href='#' onClick={()=>setContador(contador+1)}>{contador}</a>
        </>
    )