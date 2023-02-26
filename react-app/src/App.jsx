// import './home.css' 
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav_Bar from './Nav';
import Footer from './Footer';
import Home from './Home';
import Cursos, {CrearCurso } from './Cursos'
import './css/style.css'




function App() {
  return (
    <>
      <BrowserRouter>
        <Nav_Bar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cursos' element={<Cursos logged={true}/>} />
          <Route path='/cursos/crear_curso' element={<CrearCurso/>} />

        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  )

}




export default App;