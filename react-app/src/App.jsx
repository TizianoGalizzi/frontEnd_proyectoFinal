// import './home.css' 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav_Bar from './Nav';
import Footer from './Footer';
import Home from './Home';
import Cursos, {CrearCurso,InscribirAlumno } from './Cursos'
import Alumnos, {CrearAlumno} from './Alumnos'
import './css/style.css'


import Prueba from './Prueba'




function App() {
  return (
    <>
      <BrowserRouter>
        <Nav_Bar logged={true}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cursos' element={<Cursos logged={true}/>} />
          <Route path='/cursos/crearCurso' element={<CrearCurso/>} />
          <Route path='/cursos/inscripcionAlumno' element={<InscribirAlumno/>} />
          <Route path='/alumnos' element={<Alumnos logged={true} />}/>
          <Route path='/alumnos/crearAlumno' element={<CrearAlumno/>}/>
          <Route path='/pruebas' element={<Prueba/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  )

}




export default App;