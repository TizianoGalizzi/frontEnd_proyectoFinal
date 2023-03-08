import './css/listadoAlumnos.css'
import './css/style.css'
import NavAdmin,{NavPublic} from './Nav';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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


let token = sessionStorage.getItem('token')

function ListaAlumnos(props) {
    const [Alumns, setAlumns] = useState([])
    const [Stop, setStop] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [alumnoData, setAlumnoData] = useState({})

    const deleteForever = function () {
        let request = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3030/alumnos/${alumnoData.id}`, request)
            .then(res => {
                return res.json().then(body => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body
                    }
                })
            })
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    setStop(true)
                } else {
                    toast.error(result.body.message, {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })

                }
            }),
            (error) => {
                console.log(error)

            }
    }

    const showDeleteModal = (datosAlumno) => {
        setDeleteModal(true);
        setAlumnoData(datosAlumno)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }


    let fetchMethod = {
        method: 'GET',
        headers: {
            "authorization": sessionStorage.getItem('token')
        }
    }
    useEffect(() => {
        fetch('http://localhost:3030/alumnos', fetchMethod)
            .then(res => {
                return res.json().then(body => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body
                    }
                })
            })
            .then(result => {
                if (result.ok) {
                    setAlumns(result.body)
                } else {
                    toast.error(result.body.message, {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
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
                                        <Link to={`/alumnos/gestAlumno/${alumno.id}?nombre=${alumno.nombre}&apellido=${alumno.apellido}`}>
                                            <Button className='settingsButton-td td-edit'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className='settingsButton-container' >
                                        <Button onClick={() => showDeleteModal(alumno)} className='settingsButton-td td-delete'>
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </Button>


                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
                <Modal
                    show={deleteModal}
                    onHide={closeDeleteModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar alumno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Seguro que deseas eliminar al alumno <b>{alumnoData.apellido} {alumnoData.nombre} </b>?.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDeleteModal}>
                            Close
                        </Button>
                        <Button onClick={() => deleteForever()} variant="danger">Eliminar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

function Alumnos() {
    document.title = 'Alumnos'
    if (token) {
        return (
            <>
                <NavAdmin />
                <AlumnosAdmin />
                <Footer />
                <ToastContainer />
            </>
        )

    } else {
        return (
            <>
                <NavPublic />
                <AlumnosPublic />
                <Footer />
                <ToastContainer />
            </>
        )
    }
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
                                    <Button id='createAlumn-button' >Crear un alumno</Button>
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
            <ToastContainer />
        </>
    )
}
function AlumnosPublic() {
    return (
        <>
            <p>No tiene acceso a esta pagina</p>
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
    const [params] = useSearchParams();
    let nombre = params.get('nombre')
    let apellido = params.get('apellido')
    const idA = useParams();
    const navigate = useNavigate();
    idA.id ? document.title='Modificar alumno': document.title = 'Crear alumno'

    const gestInputHandler = (event) => {
        setGestAlumno({
            ...gestAlumno,
            [event.target.name]: event.target.value
        })
    }
    const postFetch = (request) => {
        return fetch(`http://localhost:3030/alumnos/${idA.id}`, request)
            .then(res => {
                return res.json().then(body => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body
                    }
                })
            })
            .then(result => {
                if (result.ok) {
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
                } else {
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
            (error) => {
                console.log(error)

            }
    }
    const putFetch = (request) => {
        return fetch(`http://localhost:3030/alumnos`, request)
            .then(res => {
                return res.json().then(body => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body
                    }
                })
            })
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, {
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
                } else {
                    toast.error(result.body.message, {
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
            (error) => {
                console.log(error)

            }
    }

    const gestSave = (event) => {
        event.preventDefault();
        let request = {
            method: idA.id ? 'POST' : 'PUT',
            body: JSON.stringify(gestAlumno),
            headers: { 'Content-type': 'application/json', 'authorization':sessionStorage.getItem('token') }
        }

        { idA.id ? postFetch(request) : putFetch(request) }


    }

    return (
        <>
            <NavAdmin />
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
                            <h1 className='crearAlumno-h1'> {idA.id ? `Modificar alumno ${apellido} ${nombre}` : `Crear alumno`}</h1>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-name-input">Nombre</label>
                                    <input id="alumn-name-input" type="text" className="form-control" onChange={gestInputHandler} placeholder='Ingrese el nombre del alumno' name="nombre" required autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-surname-input">Apellido</label>
                                    <input id="alumn-surname-input" type="text" className="form-control" onChange={gestInputHandler} placeholder='Ingrese el apellido del alumno' name="apellido" required autoComplete='off' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm-3">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-idUsuario-input">ID de usuario</label>
                                    <input className='form-control' type="text" id="alumn-idUsuario-input" onChange={gestInputHandler} name="id_usuario" required autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-6 col-sm-9" >
                                <div className="input-container">
                                    <label className='form-label' for="alumn-dni-input">DNI</label>
                                    <input className='form-control' type="text" id="alumn-dni-input" onChange={gestInputHandler} placeholder="Ejemplo: 46241068" name="dni" required autoComplete='off' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <button type='submit' onClick={gestSave} className='btn crearAlumno-button'> {idA.id ? `Guardar cambios` : `Crear alumno`}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />

        </>
    )
}


export default Alumnos; 