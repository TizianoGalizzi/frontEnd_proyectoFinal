import './css/style.css';
import './css/cursos.css';
import './css/inscAlumnos.css';
import NavAdmin, { NavPublic } from './Nav';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faArrowLeft, faUserPlus, faUserXmark, faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

let token = sessionStorage.getItem('token')
function AlumnoTablacursos(props) {
    const [DeleteAlumnModal, setDeleteAlumnModal] = useState(false);
    const [Alumns, setAlumns] = useState([])
    const [Stop, setStop] = useState(false)
    let fetchMethod = {
        method: 'GET',
        headers: {
            "authorization": sessionStorage.getItem('token')
        }
    }
    let token = sessionStorage.getItem('token')
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
                <Table responsive="sm" striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>ID_usuario</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> {/*Fila de tabla para alumno no inscripto al curso*/}
                            <td>1</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td className='settingsButton-container' >
                                <Button className='settingsButton-td settingsButton-td--add '>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Button>

                            </td>
                        </tr>
                        <tr className='inscriptedCourses-tr'> {/*Fila de tabla para alumno si inscripto al curso*/}
                            <td>1</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td>Ejemplo de alumno</td>
                            <td className='settingsButton-container' >
                                <Button className='settingsButton-td settingsButton-td--eliminate '>
                                    <FontAwesomeIcon icon={faUserXmark} />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

function ListaCursos() {
    const [Courses, setCourses] = useState([])
    const [Stop, setStop] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);
    const [courseData, setCourseData] = useState({})

    const deleteForever = function () {
        let request = {
            method: 'DELETE'
        }
        fetch(`http://localhost:3030/cursos/${courseData.id}`, request)
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

    const showModal = (cursoData) => {
        setDeleteModal(true);
        setCourseData(cursoData)
    }
    const handleClose = () => {
        setDeleteModal(false)
    }


    let fetchMethod = {
        method: 'GET'
    }

    useEffect(() => {
        fetch('http://localhost:3030/cursos', fetchMethod)
            .then(resp => resp.json())
            .then(resp => {
                setCourses(resp)
            })
    }, [Stop])

    return (
        <>
            <div>
                <Table className='table-listCourses' responsive="sm" striped bordered>
                    <thead>
                        <tr className='t-head-bg'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Año</th>
                            <th>Activo</th>
                            <th>Editar</th>
                            <th>Gestion Alumnos</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Courses.map((curso, index) => {
                            return (
                                <tr className='listCourses-tr' key={index}>
                                    <td className='listCourses-td'>{curso.id} </td>
                                    <td className='listCourses-td'>{curso.nombre} </td>
                                    <td className='listCourses-td'>{curso.descripcion} </td>
                                    <td className='listCourses-td'>{curso.imagen} </td>
                                    <td className='listCourses-td'>{curso.año} </td>
                                    <td className='listCourses-td'>{curso.activo} </td>
                                    <td className='settingsButton-container'>
                                        <Link to={`/cursos/gestCurso/${curso.id}?nombre=${curso.nombre}`}>
                                            <Button className='settingsButton-td td-edit'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className='settingsButton-container'>
                                        <Link to={`/cursos/inscAlumno/${curso.id}`}>
                                            <Button className='settingsButton-td td-edit'>
                                                <FontAwesomeIcon icon={faUserPlus} />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className='settingsButton-container' >
                                        <Button onClick={() => showModal(curso)} className='settingsButton-td td-delete'>
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
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Seguro que deseas eliminar al curso <b>{courseData.nombre} </b>?.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={() => deleteForever()} variant="danger">Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer />
            </div>
        </>
    )
}
function Cursos() {
    document.title = 'Cursos'
    if (token) {
        return (
            <>
                <NavAdmin />
                <CursosAdmin />
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <NavPublic />
                <CursosPublic />
                <Footer />
            </>
        )
    }


}
function CursosAdmin() {
    return (<>
        <section id="listaCursos">
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <div className="settings-container-child">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Crear cursos</Tooltip>}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <Link to="/cursos/gestCurso">
                                        <Button {...triggerHandler} className='settings-button create-button'>
                                            <FontAwesomeIcon icon={faPlus} ref={ref} />
                                        </Button>
                                    </Link>
                                )}
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h1 className="main-title-h1">Cursos disponibles</h1>
                    </div>
                </div>
                <div className="row">
                    <ListaCursos />
                </div>
            </div>
        </section>
        <ToastContainer />
    </>
    )
}

export function CursosPublic() {
    const [Courses, setCourses] = useState([])
    const [Stop, setStop] = useState(false)
    let fetchMethod = {
        method: 'GET'
    }

    useEffect(() => {
        fetch('http://localhost:3030/cursos', fetchMethod)
            .then(resp => resp.json())
            .then(resp => {
                setCourses(resp)
            })
    }, [Stop])
    return (<>
        <section id="listaCursos">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="main-title-h1">Cursos disponibles</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="grid-container">
                        {Courses.map((curso, index) => {
                    
                            return (
                                <div key={index} className="course-card">
                                    <div className="img-container">
                                        <a href="#"><img className="course-img" src={curso.imagen} alt={curso.nombre} /></a>
                                    </div>
                                    <div className="cardText-container">
                                        <h3>{curso.nombre} </h3>
                                        <p>
                                            {curso.descripcion}
                                        </p>
                                    </div>
                                </div>
                            )

                        })}


                    </div>
                </div>
            </div>
        </section>
    </>)
}
export function GestCurso() {
    
    const [GestCurso, setGestCurso] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        año: "",
        activo: ""
    })
    const [params] = useSearchParams();
    let name = params.get('nombre')
    const idA = useParams();
    const navigate = useNavigate();
    idA.id ? document.title = 'Modificar curso' : document.title='Crear curso'

    const postFetch = (request) => {
        return fetch(`http://localhost:3030/cursos/${idA.id}`, request)
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
                    toast.success(`Curso modificado correctamente! `, {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    return navigate('/cursos');
                } else {
                    toast.error('Error en la modificacion del curso.', {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    return navigate('/cursos')
                }
            }),
            (error) => {
                console.log(error)

            }
    }
    const putFetch = (request) => {
        return fetch(`http://localhost:3030/cursos/`, request)
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
                    toast.success('Curso creado con exito!', {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    return navigate('/cursos');
                } else {
                    toast.error('Error en la creacion del curso.', {
                        position: "bottom-right",
                        autoClose: 4500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    return navigate('/cursos')
                }
            }),
            (error) => {
                console.log(error)

            }
    }
    const gestInputHandler = (event) => {
        setGestCurso({
            ...GestCurso,
            [event.target.name]: event.target.value
        })
    }
    const gestSave = (event) => {
        event.preventDefault();
        GestCurso.activo = "1"
        let request = {
            method: idA.id ? 'POST' : 'PUT',
            body: JSON.stringify(GestCurso),
            headers: { 'Content-type': 'application/json', 'authorization': sessionStorage.getItem('token') }
        }

        idA.id ? postFetch(request) : putFetch(request)
    }
    return (
        <>
            <NavAdmin />
            <section id="gestCurso">
                <div className="backButton-container">
                    <Link to="/cursos">
                        <Button type='button' className='backButton'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className='gestCurso-h1'>{idA.id ? `Modificar curso ${name}` : `Crear curso`} </h1>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="input-container">
                                    <label for="course-name-input">Nombre del curso</label>
                                    <input id="course-name-input" onChange={gestInputHandler} autoComplete='off' name="nombre" type="text" className="form-control" placeholder='Ingrese un nombre para el curso' required />
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="input-container">
                                    <label for="course-date-input">Año de creacion</label>
                                    <input id="course-date-input" autoComplete='off' onChange={gestInputHandler} name="año" type="number" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-container">
                                    <label for="course-description-textarea">Descripcion</label>
                                    <textarea className='form-control' autoComplete='off' onChange={gestInputHandler} name="descripcion" id="course-description-textarea" placeholder='Ingrese una descripcion sobre que trata el curso' required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-container">
                                    <label for="course-img-input">Imagen</label>
                                    <input id="course-img-input" autoComplete='off' onChange={gestInputHandler} name="imagen" type="file" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type='submit' onClick={gestSave} className='btn gestCurso-button'>{idA.id ? `Guardar Cambios` : `Crear Curso`} </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}
export function InscribirAlumno() {
    const [Alumns, setAlumns] = useState([])
    const [inscriptedAlumns, setInscriptedAlumns] = useState([])
    const [Stop, setStop] = useState(false)
    const navigate = useNavigate();
    const params = useParams()
    let idA = useParams();


    {/*
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
     */}
    let getMethod = {
        method: 'GET',
        headers: {
            "authorization": sessionStorage.getItem('token')
        }
    }
    let postMethod = {
        method: 'POST',
        headers: {
            "authorization": sessionStorage.getItem('token')
        }
    }
    useEffect(() => {
        fetch('http://localhost:3030/alumnos', getMethod)
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
            .then(res => {
                fetch(`http://localhost:3030/cursos/inscAlumno/${idA.id}`, postMethod)
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
                            let dataLength = [result.body].length;
                            for (let i = -1; i < dataLength; i++) {
                                if (i < 0) {
                                    continue
                                } else {
                                    setInscriptedAlumns(result.body[i].id)
                                }
                            }
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
            })
    }, [Stop])
    return (
        <>
            <NavAdmin/>
            <section id="inscripcionAlumnos">
                <div className="backButton-container">
                    <Link to="/cursos">
                        <Button type='button' className='backButton'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="main-title">Inscripcion alumnos</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Table responsive="sm" bordered>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>DNI</th>
                                        <th>ID_usuario</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Alumns.map((alumno, index) => {

                                        return (
                                            <tr key={index} >
                                                <td>{alumno.id}</td>
                                                <td>{alumno.nombre}</td>
                                                <td>{alumno.apellido}</td>
                                                <td>{alumno.dni}</td>
                                                <td>{alumno.id_usuario}</td>
                                                <td className='settingsButton-container' >
                                                    <Button className='settingsButton-td settingsButton-td--add '>
                                                        <FontAwesomeIcon icon={faUserPlus} />
                                                    </Button>
                                                    <Button className='settingsButton-td settingsButton-td--eliminate '>
                                                        <FontAwesomeIcon icon={faUserXmark} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    {inscriptedAlumns.map((alumnoIns, index) => {
                                        return (
                                            <tr key={index} className='inscriptedCourses-tr'> {/*Fila de tabla para alumno si inscripto al curso*/}
                                                <td>LOS OTROS RRR</td>
                                                <td>{alumnoIns.id}</td>
                                                <td>{alumnoIns.nombre}</td>
                                                <td>{alumnoIns.apellido}</td>
                                                <td>{alumnoIns.dni}</td>
                                                <td>{alumnoIns.id_usuario}</td>
                                                <td className='settingsButton-container' >
                                                    <Button className='settingsButton-td settingsButton-td--eliminate '>
                                                        <FontAwesomeIcon icon={faUserXmark} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}



export default Cursos;