import './css/listadoAlumnos.css'
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faArrowLeft, faUserPlus, faUserXmark, faPenToSquare, faCircleXmark, faContactBook } from '@fortawesome/free-solid-svg-icons'


function DeleteAlumn_Modal(props) {
    let alumnoExample = "Tiziano";
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Eliminar alumno
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='spaceInModal'>
                            <Col xs={12}>
                                <p>Estas seguro que deseas eliminar el alumno <strong>{alumnoExample}</strong> del sistema?</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
                    <Button variant='danger'>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function ListaAlumnos(props) {
    const [DeleteAlumnModal, setDeleteAlumnModal] = useState(false);
    const [Alumns, setAlumns] = useState([])
    const [Stop, setStop] = useState(false)
    let fetchMethod = {
        method: 'GET'
    }

    useEffect(() => {
        fetch('http://localhost:3030/alumnos', fetchMethod)
            .then(resp => resp.json())
            .then(resp => {
                setAlumns(resp)
            })
    }, [Stop])

    return (
        <>
            <div>
                <Table className='table-listalumns' responsive="sm" striped bordered>
                    <thead>
                        <tr className='t-head-bg'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>id_usuario</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alumns.map((alumno, index) => {
                            return (
                                <tr key={index}>
                                    <td>{alumno.id} </td>
                                    <td>{alumno.nombre} </td>
                                    <td>{alumno.apellido} </td>
                                    <td>{alumno.dni} </td>
                                    <td>{alumno.id_usuario} </td>
                                    <td className='settingsButton-container'>
                                        <Link to={`/alumnos/gestAlumno/${alumno.id}`}>
                                            <Button className='settingsButton-td td-edit'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                             </Button>
                                        </Link>
                                    </td>
                                    <td className='settingsButton-container' >
                                        <Button onClick={() => setDeleteAlumnModal(true)} className='settingsButton-td td-delete'>
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </Button>
                                        <DeleteAlumn_Modal show={DeleteAlumnModal} onHide={() => setDeleteAlumnModal(false)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
function Alumnos(props) {
    let isLoggedIn = props.logged;
    return (
        <>
            {isLoggedIn ? (<AlumnosAdmin />) : (<AlumnosPublic />)}

        </>
    )
}
function AlumnosAdmin() {
    return (
        <>
            <section id="listadoAlumnos">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="page-title">
                                Listado de alumnos
                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="createAlumn-container">
                                <h3>Quieres crear un alumno?</h3>
                                <Link to="/alumnos/gestAlumno">
                                    <Button id='createAlumn-button' >Crear un alumno?</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <p class="filter-text">Lista de alumnos</p>
                        </div>
                    </div> 
                    {/*
                    <div class="row filter-container">
                        <div class="col-6 col-sm-3 filter-item">
                            <div class="form-floating">
                                <select class="form-select" id="floatingSelect">
                                    <option selected value="">A-Z</option>
                                    <option value="">Z-A</option>
                                </select>
                                <label for="floatingSelect">Ordenar de:</label>
                            </div>
                        </div>
                        <div class="col-6 col-sm-3 filter-item">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="id" />
                                <label for="id">Por id</label>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 filter-item">
                            <div class="form-floating">
                                <input type="search" class="form-control" id="searchAlumn" />
                                <label for="searchAlumn">Buscar alumno:</label>
                            </div>
                        </div>
                    </div>
                    */}
                    <div className="row">
                        <div className="col">
                            <ListaAlumnos />

                        </div>
                    </div>
                </div>
            </section >
            <ToastContainer/>
        </>
    )
}
export function GestAlumno(props) {
    const [gestAlumno, setGestAlumno] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        id_usuario: ""
    })
    const idA = useParams();
    const navigate = useNavigate();

    const gestInputHandler = (event) => {
        setGestAlumno({
            ...gestAlumno,
            [event.target.name]: event.target.value
        })
    }
    const postFetch = (request)=>{
        return fetch(`http://localhost:3030/alumnos/${idA.id}`, request)
        .then(res =>{
            return res.json().then(body=>{
                return {
                    status: res.status,
                    ok: res.ok,
                    headers: res.headers,
                    body:body
                }
            })    
        })
        .then(result =>{
            if(result.ok){
                toast.success(`Alumno modificado correctamente!`, {
                    position: "bottom-right",
                    autoClose: 4500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                return navigate('/alumnos');
            }else{
                toast.error('Error en la modificacion del alumno .', {
                    position: "bottom-right",
                    autoClose: 4500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }) 
                return navigate('/alumnos')
            }
        }),
        (error)=>{
            console.log(error)
            
        }
    }
    const putFetch = (request)=>{
        return fetch(`http://localhost:3030/alumnos/`, request)
        .then(res =>{
            return res.json().then(body=>{
                return {
                    status: res.status,
                    ok: res.ok,
                    headers: res.headers,
                    body:body
                }
            })    
        })
        .then(result =>{
            if(result.ok){
                toast.success('Alumno creado con exito!', {
                    position: "bottom-right",
                    autoClose: 4500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                return navigate('/alumnos');
            }else{
                toast.error('Error en la creacion del alumno.', {
                    position: "bottom-right",
                    autoClose: 4500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                return navigate('/alumnos')
            }
        }),
        (error)=>{
            console.log(error)
            
        }
    }

    const gestSave = (event) => {
        event.preventDefault();
        let request = {
            method: idA.id ? 'POST' : 'PUT',
            body : JSON.stringify(gestAlumno),
            headers: { 'Content-type': 'application/json' }
        }

        idA.id ?  postFetch(request)  : putFetch(request)
        
        
    }
    
    return (
        <>
            <section id='crearAlumno'>
                <div className="backButton-container">
                    <Link to="/alumnos">
                        <Button type='button' className='backButton'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className='crearAlumno-h1'> {idA.id ? `Modificar alumno <b>${gestAlumno.apellido}</b>`: `Crear alumno`}</h1>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-name-input">Nombre</label>
                                    <input id="alumn-name-input" type="text" className="form-control" onChange={gestInputHandler} placeholder='Ingrese el nombre del alumno' name="nombre" required />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-surname-input">Apellido</label>
                                    <input id="alumn-surname-input" type="text" className="form-control" onChange={gestInputHandler} placeholder='Ingrese el apellido del alumno' name="apellido" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm-3">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-idUsuario-input">ID de usuario</label>
                                    <input className='form-control' type="text" id="alumn-idUsuario-input" onChange={gestInputHandler} name="id_usuario" required />
                                </div>
                            </div>
                            <div className="col-6 col-sm-9" >
                                <div className="input-container">
                                    <label className='form-label' for="alumn-dni-input">DNI</label>
                                    <input className='form-control' type="text" id="alumn-dni-input" onChange={gestInputHandler} placeholder="Ejemplo: 46241068" name="dni" required />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12">
                                <button type='submit' onClick={gestSave} className='btn crearAlumno-button'> {idA.id ? `Guardar cambios`: `Crear alumno`}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
          
        </>
    )
}

function AlumnosPublic() {
    return (
        <>

        </>
    )
}
export default Alumnos; 