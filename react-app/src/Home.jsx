import './css/home.css'
import './css/style.css'
import NavAdmin,{NavPublic} from './Nav';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let token = sessionStorage.getItem('token')
function Home() {
    document.title = 'Home'
    if(token){
        return(
            <>
            <NavAdmin/>
            <section id="hero">
                <div
                    id="carouselAutoplaying"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="/LaptopCode2.png"
                                className="d-block w-100"
                                alt="Bienvenido a la plataforma de gestión de cursos de Silicon"
                            />
                            <div className="carousel-caption">
                                <h5>
                                    Bienvenido a la plataforma de gestión de cursos de Silicon
                                </h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/Programm.png"
                                className="d-block w-100"
                                alt="Creando talento IT en el nordeste Argentino"
                            />
                            <div className="carousel-caption">
                                <h5>Creando talento IT en el nordeste Argentino</h5>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselAutoplaying"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselAutoplaying"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <section id="about">
                <div className="container">
                    <main>
                        <div className="info">
                            <h3>Que es TezCourses?</h3>
                            <p>
                                TezCourses es una
                                <em> plataforma de aprendizaje gratuita</em> creada por
                                <strong> Silicon Misiones</strong>, donde podras acceder a un gran
                                catalogo de los mejores cursos del mundo <abbr>IT</abbr> y lograrás
                                formarte para conseguir los empleos mas demandados del momento.
                            </p>
                        </div>
                    </main>
                </div>
            </section>
            <section id="registerNow">
                <div className="container-fluid aboutFluid">
                    <div className="registerNow-container">
                        <div className="registerNow-divContain">
                            <h2 className="registraYa">Registrate ya!</h2>
                            <Link to="/register">
                            <button type="button" id="registraYa" className="btn">
                                Registrarse
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        <Footer/>
            </>
        )
    }else{
        
        return(
            <>
            <NavPublic />
            <section id="hero">
                <div
                    id="carouselAutoplaying"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="/LaptopCode2.png"
                                className="d-block w-100"
                                alt="Bienvenido a la plataforma de gestión de cursos de Silicon"
                            />
                            <div className="carousel-caption">
                                <h5>
                                    Bienvenido a la plataforma de gestión de cursos de Silicon
                                </h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/Programm.png"
                                className="d-block w-100"
                                alt="Creando talento IT en el nordeste Argentino"
                            />
                            <div className="carousel-caption">
                                <h5>Creando talento IT en el nordeste Argentino</h5>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselAutoplaying"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselAutoplaying"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <section id="about">
                <div className="container">
                    <main>
                        <div className="info">
                            <h3>Que es TezCourses?</h3>
                            <p>
                                TezCourses es una
                                <em> plataforma de aprendizaje gratuita</em> creada por
                                <strong> Silicon Misiones</strong>, donde podras acceder a un gran
                                catalogo de los mejores cursos del mundo <abbr>IT</abbr> y lograrás
                                formarte para conseguir los empleos mas demandados del momento.
                            </p>
                        </div>
                    </main>
                </div>
            </section>
            <section id="registerNow">
                <div className="container-fluid aboutFluid">
                    <div className="registerNow-container">
                        <div className="registerNow-divContain">
                            <h2 className="registraYa">Registrate ya!</h2>
                            <Link to="/register">
                            <button type="button" id="registraYa" className="btn">
                                Registrarse
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        <Footer/>
            </>
        )
    }
    
}
export default Home;