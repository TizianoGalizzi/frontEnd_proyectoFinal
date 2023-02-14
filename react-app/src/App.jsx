import { useState } from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
         {/* Route requiere los parametros path(la url del sitio de la pagina) y element(el componente que queremos que se muestre) */}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Home/>}></Route>
        <Route path='/register' element={<Home/>}></Route>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
