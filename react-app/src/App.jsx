// import './home.css' 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav_Bar from './Nav';
import Footer from './Footer';
import Home from './Home';
import Cursos, { GestCurso, InscribirAlumno } from './Cursos'
import Alumnos, { GestAlumno } from './Alumnos'
import './css/style.css'




function App() {
  return (
    <>
      <BrowserRouter>
        <Nav_Bar logged={true} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cursos' element={<Cursos logged={false} />} />
          <Route path='/cursos/gestCurso' element={<GestCurso />} />
          <Route path='/cursos/gestCurso/:id' element={<GestCurso />} />
          <Route path='/cursos/gestAlumno' element={<InscribirAlumno />} />
          <Route path='/alumnos' element={<Alumnos logged={true} />} />
          <Route path='/alumnos/gestAlumno' element={<GestAlumno />} />
          <Route path='/alumnos/gestAlumno/:id' element={<GestAlumno />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  )

}




export default App;