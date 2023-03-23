import './css/style.css';
import './css/cursos.css';
import './css/inscAlumnos.css';
import NavAdmin, { NavPublic } from './Nav';
import Footer from './Footer';
import jwt_decode from "jwt-decode";
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




function ListaCursos() {
    const [Courses, setCourses] = useState([])
    const [Stop, setStop] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);
    const [courseData, setCourseData] = useState({})

    const deleteForever = function () {
        let request = {
            method: 'DELETE',
            headers: { 'authorization': sessionStorage.getItem('token') }
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
        method: 'GET',
        headers: { 'authorization': sessionStorage.getItem('token') }
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
                                        <Link to={`/cursos/gestCurso/${curso.id}?nombre=${curso.nombre}&descripcion=${curso.descripcion}&imagen=${curso.imagen}&año=${curso.año}`}>
                                            <Button className='settingsButton-td td-edit'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className='settingsButton-container'>
                                        <Link to={`/cursos/inscAlumno/${curso.id}?nombre=${curso.nombre} `}>
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
                        <a href='/cursos'>
                            <Button onClick={() => deleteForever()} variant="danger">Eliminar</Button>
                        </a>
                    </Modal.Footer>
                </Modal>
                <ToastContainer />
            </div>
        </>
    )
}

function Cursos() {
    debugger
    const [authToken, setAuthToken] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuthToken(sessionStorage.getItem('token'))
        } else {
            setAuthToken("")
        }
    }, [authToken])
    document.title = 'Cursos'
    if (authToken != "") {
        let decoded = jwt_decode(authToken)
        if (decoded.rol == 'admin') {
            return (
                <>
                    <NavAdmin nickname={decoded.nickname} />
                    <CursosAdmin />
                    <Footer />
                </>
            )
        } else {
            return (
                <>
                    <NavPublic token={authToken} nickname={decoded.nickname} />
                    <CursosPublic />
                    <Footer />
                </>
            )
        }
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
function CursosPublic() {
    const [Courses, setCourses] = useState([])
    const [Stop, setStop] = useState(false)
    const imageconverter = (img) => {
        let imgCut = img.substr(10,img.length);
        let barra = "/";
        let imgFixed = barra.concat(imgCut)
        return imgFixed
    }
    useEffect(() => {
        fetch('http://localhost:3030/cursos')
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
                            { var imagen = imageconverter(curso.imagen) }
                            return (
                                <div key={index} className="course-card">
                                    <div className="img-container">
                                        <Link to={ `/cursos/${curso.id}?nombre=${curso.nombre}`}><img className="course-img" src={imagen} alt={curso.nombre} /></Link>
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
export function CursoSeccion(){
    const [authToken, setAuthToken] = useState("")
    let [param] = useSearchParams();
    document.title = `Curso ${param.get('nombre')} `;
    let navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuthToken(sessionStorage.getItem('token'))
        } else {
            setAuthToken("")
        }
    }, [authToken])
    if (authToken != "") {
        let decoded = jwt_decode(authToken)
        if (decoded.rol == 'alumno') {
            return (
                <>
                    <NavPublic token={authToken} nickname={decoded.nickname} />
                    <section id="seccionCurso">
                        <h1>{param.get('nombre')}</h1>
                        
                    </section>
                    <Footer />
                </>
            )
        }
    } else {
        return (
           navigate("/login")
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
export function GestCurso() {
    const [GestCurso, setGestCurso] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        año: "",
        activo: ""
    })
    const [authToken, setAuthToken] = useState("")

    //Extraemos datos de los queryParams:
    const [params] = useSearchParams();
    let nombre = params.get('nombre');
    let añoCreacion = params.get('año');
    let imagen = params.get('imagen')
    let descripcion = params.get('descripcion')

    const idA = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuthToken(sessionStorage.getItem('token'))
            setGestCurso({
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                año: añoCreacion,
                activo: ""
            })
        } else {
            setAuthToken("")
        }
    }, [authToken]);

    idA.id ? document.title = 'Modificar curso' : document.title = 'Crear curso'


    const postFetch = (request) => {
        debugger
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
                    toast.success(result.body.message, {
                        position: "bottom-right",
                        autoClose: 6500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    navigate('/cursos');

                } else {
                    toast.error(result.body.message, {
                        position: "bottom-right",
                        autoClose: 6500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    navigate('/cursos')
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
                    navigate('/cursos');
                    toast.success(result.body.message, {
                        position: "bottom-right",
                        autoClose: 6500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })

                } else {
                    navigate('/cursos')
                    toast.error(result.body.message, {
                        position: "bottom-right",
                        autoClose: 6500,
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
    if (authToken != "") {
        let decoded = jwt_decode(authToken)
        return (
            <>
                <NavAdmin nickname={decoded.nickname} />
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
                                <h1 className='gestCurso-h1'>{idA.id ? `Modificar curso ${nombre}` : `Crear curso`} </h1>
                            </div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <div className="input-container">
                                        <label for="course-name-input">Nombre del curso</label>
                                        <input id="course-name-input" onChange={gestInputHandler} value={GestCurso.nombre} autoComplete='off' name="nombre" type="text" className="form-control" placeholder='Ingrese un nombre para el curso' required />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="input-container">
                                        <label for="course-date-input">Año de creacion</label>
                                        <input id="course-date-input" autoComplete='off' onChange={gestInputHandler} value={GestCurso.año} name="año" type="number" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-container">
                                        <label for="course-description-textarea">Descripcion</label>
                                        <textarea className='form-control' autoComplete='off' onChange={gestInputHandler} value={GestCurso.descripcion} name="descripcion" id="course-description-textarea" placeholder='Ingrese una descripcion sobre que trata el curso' required></textarea>
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
}
export function InscribirAlumno() {
    document.title = 'InscripcionAlumnos'
    const [refresh, setRefresh] = useState(0)
    const [inscripted, setInscripted] = useState([])
    const [Alumns, setAlumns] = useState([])
    const [signUp, setSignUp] = useState({
        data: []
    })
    const [dropAlumns, setDropAlumns] = useState({
        data: []
    })
    const [authToken, setAuthToken] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuthToken(sessionStorage.getItem('token'))
            
        } else {
            setAuthToken("")
        }
    }, [authToken]);
    const navigate = useNavigate();
    let [params] = useSearchParams();
    let nombreCurso = params.get('nombre')
    let idA = useParams();


    const destructureId = (alumnos) => {
        for (let i = 0; i < alumnos.length; i++) {
            if (inscripted.indexOf(alumnos[i].id == -1)) {
                setInscripted(inscripted => [...inscripted, alumnos[i].id])
            } else {
                continue;
            }
        }

    }
    const addAlumn = (alumnoId) => {
        let addRow = document.getElementById(alumnoId)
        if (signUp.data.indexOf(alumnoId) == -1) {
            setSignUp({
                data: [...signUp.data, alumnoId]
            })

            addRow.style.backgroundColor = "rgba(13, 110, 253,0.85)";
            addRow.style.color = "white";
        } else {
            let posicion = signUp.data.indexOf(alumnoId)
            setSignUp({
                data: [signUp.data[posicion] = 0]
            })
            setSignUp(signUp)
            addRow.style.backgroundColor = "white";
            addRow.style.color = "black";
        }

    }
    const dropAlumn = (alumnoId, alumnoDni) => {
        let addRow = document.getElementById(alumnoId)
        if (dropAlumns.data.indexOf(alumnoId) == -1) {
            setDropAlumns({
                data: [...dropAlumns.data, alumnoId]
            })
            addRow.style.backgroundColor = "var(--secondary-color)";
            addRow.style.color = "var(--third-color)";
            document.getElementById(alumnoDni).style.color = "var(--third-color)"
        } else {
            let posicion = dropAlumns.data.indexOf(alumnoId)
            setDropAlumns({
                data: [dropAlumns.data[posicion] = 0]
            })
            setDropAlumns(dropAlumns)
            addRow.style.backgroundColor = "var(--registra-ya-bg)";
            addRow.style.color = "white";
        }
    }
    const checkNotZero = (element) => {
        return element > 0;
    }
    const addFetch = () => {
        let request = {
            method: 'PUT',
            body: JSON.stringify(signUp),
            headers: { 'Content-type': 'application/json', 'authorization': sessionStorage.getItem('token') }
        }
        return fetch(`http://localhost:3030/cursos/inscAlumno/${idA.id}`, request)
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
                    alert(result.body.message)
                    setSignUp([])
                    setRefresh(refresh + 1)
                    navigate("/cursos")

                } else {
                    alert(result.body.message)
                    setRefresh(refresh + 1)
                }
            }),
            (error) => {
                console.log(error)
            }
    }
    const dropFetch = () => {
        let request = {
            method: 'DELETE',
            body: JSON.stringify(dropAlumns),
            headers: { 'Content-type': 'application/json', 'authorization': sessionStorage.getItem('token') }
        }
        return fetch(`http://localhost:3030/cursos/inscAlumno/${idA.id}`, request)
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
                    alert(result.body.message)
                    setSignUp([])
                    setRefresh(refresh + 1)
                } else {
                    alert(result.body.message)
                    setRefresh(refresh + 1)
                }
            }),
            (error) => {
                console.log(error)
            }
    }
    async function doubleFetch() {
        return addFetch()
    }
    const saveInscripted = () => {
        let insID;
        for (insID of signUp.data) {
            if (insID == 0) {
                continue
            } else {
                document.getElementById(insID).style.backgroundColor = "white";
                document.getElementById(insID).style.color = "black";
            }
        }
        let dropID;
        for (dropID of dropAlumns.data) {
            if (dropID == 0) {
                continue
            } else {
                document.getElementById(dropID).style.backgroundColor = "white";
                document.getElementById(dropID).style.color = "black";
            }

        }
        if (signUp.data.length > 0 && dropAlumns.data.length == 0) {
            if (signUp.data.some(checkNotZero) == false) {
                alert("Realice alguna accion antes de presionar en Guardar Cambios");
            } else {
                return addFetch()
            }
        } else if (signUp.data.length == 0 && dropAlumns.data.length > 0) {
            if (dropAlumns.data.some(checkNotZero) == false) {
                alert("Realice alguna accion antes de presionar en Guardar Cambios");
            } else {
                return dropFetch()
            }
        }
        else if (signUp.data.length > 0 && dropAlumns.data.length > 0) {
            if (signUp.data.some(checkNotZero) == true && dropAlumns.data.some(checkNotZero) == false) {
                return addFetch()
            } else if (signUp.data.some(checkNotZero) == false && dropAlumns.data.some(checkNotZero) == true) {
                return dropFetch()
            } else {
                doubleFetch().then(
                    function (value) { dropFetch() },
                    function (error) { console.log(error) }
                )
            }

        }

    }


    useEffect(() => {
        let listById = {
            method: 'GET',
            headers: { 'authorization': sessionStorage.getItem('token') }
        }
        fetch(`http://localhost:3030/cursos/inscAlumno/${idA.id}`, listById)
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
                    destructureId(result.body.details)

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
            .then(next => {
                fetch('http://localhost:3030/alumnos')
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
            })
    }, [])

    if (authToken) {
        let decoded = jwt_decode(authToken)
        return (
            <>
                <NavAdmin nickname={decoded.nickname} />
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
                                <p><b>Curso: </b> {nombreCurso} </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Table responsive="sm" bordered>
                                    <thead>
                                        <tr className='t-head-bg'>
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
                                            let inscriptedAlumn = inscripted.indexOf(alumno.id) != -1;
                                            return (
                                                <tr key={index} id={`${alumno.id}`} className={inscriptedAlumn ? "inscriptedAlumns-tr" : ""} >
                                                    <td>{alumno.id}</td>
                                                    <td>{alumno.nombre}</td>
                                                    <td>{alumno.apellido}</td>
                                                    <td>{alumno.dni}</td>
                                                    <td>{alumno.id_usuario}</td>
                                                    {inscriptedAlumn ?
                                                        <td className='settingsButton-container'>
                                                            <Button onClick={() => dropAlumn(alumno.id, alumno.dni)} id={`${alumno.dni}`} className='settingsButton-td settingsButton-td--eliminate '>
                                                                <FontAwesomeIcon icon={faUserXmark} />
                                                            </Button>
                                                        </td>
                                                        :
                                                        <td className='settingsButton-container' >
                                                            <Button onClick={() => addAlumn(alumno.id)} className='settingsButton-td settingsButton-td--add '>
                                                                <FontAwesomeIcon icon={faUserPlus} />
                                                            </Button>
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="saveInscripted-container">
                                <a href={`/cursos/inscAlumno/${idA.id}?nombre=${nombreCurso}`}>
                                    <button onClick={saveInscripted} type="button" className='btn btn-primary saveInscripted-button'>Guardar cambios</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
                <Footer />
            </>
        )
    }

}



export default Cursos;