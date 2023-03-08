// import './home.css' 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cursos, { GestCurso, InscribirAlumno } from './Cursos'
import Alumnos, { GestAlumno } from './Alumnos'
import Login from './Login'
import Register from './Register'
import './css/style.css'



 
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/cursos' element={<Cursos/>} />
          <Route path='/cursos/gestCurso' element={<GestCurso />} />
          <Route path='/cursos/gestCurso/:id' element={<GestCurso />} />
          <Route path='/cursos/inscAlumno/:id' element={<InscribirAlumno />} />
          <Route path='/alumnos' element={<Alumnos />} />
          <Route path='/alumnos/gestAlumno' element={<GestAlumno />} />
          <Route path='/alumnos/gestAlumno/:id' element={<GestAlumno />} />
        </Routes>
      </BrowserRouter >
    </>
  )

}




export default App;