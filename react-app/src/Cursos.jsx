import './css/style.css'
import './css/cursos.css'
import './css/inscAlumnos.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faArrowLeft, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons'

function ModalEdit(props) {
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Curso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <label for="selectCourse" className="form-label">Que curso desea editar?</label>
                                <select id="selectCourse" className="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example">
                                    <option selected>Selecciona un curso</option>
                                    <option value="1">NodeJS</option>
                                    <option value="2">SQL</option>
                                    <option value="3">asdasd</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <label for="edit-img-input">Seleccione una nueva imagen para el curso</label>
                                <input id="edit-img-input" type="file" className="form-control" />
                            </Col>
                            <Col xs={12}>
                                <label for="edit-title-input">Escriba un nuevo titulo para el curso</label>
                                <input id="edit-title-input" type="text" className="form-control" />
                            </Col>
                            <Col xs={12}>
                                <label for="edit-title-input">Descripcion del curso</label>
                                <textarea id="edit-title-input" type="" className="form-control"></textarea>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button>Editar</Button>
                    <Button>Eliminar curso</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
function CursoTablaAlumnos(props) {
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
                        <tr className='inscriptedAlumns-tr'> {/*Fila de tabla para alumno si inscripto al curso*/}
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
function Cursos(props) {
    let isLoggedIn = props.logged;
    return (
        <>
            {isLoggedIn ? (<CursosAdmin />) : (<CursosPublic />)}
        </>
    )
}
function CursosAdmin() {
    const [modalEdit, setModalEdit] = useState(false);
    return (<>
        <section id="listaCursos">
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <div className="settings-container-child">
                            <OverlayTrigger
                                placement="left"
                                overlay={<Tooltip id="button-tooltip-2">Editar cursos</Tooltip>}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <Button className='settings-button edit-button' {...triggerHandler} onClick={() => setModalEdit(true)}>
                                        <FontAwesomeIcon icon={faPen} ref={ref} />
                                    </Button>
                                )}
                            </OverlayTrigger>
                            <ModalEdit show={modalEdit} onHide={() => setModalEdit(false)} />
                        </div>
                        <div className="settings-container-child">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Crear cursos</Tooltip>}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <Link to="/cursos/crearCurso">
                                        <Button {...triggerHandler} className='settings-button create-button'>
                                            <FontAwesomeIcon icon={faPlus} ref={ref} />
                                        </Button>
                                    </Link>
                                )}
                            </OverlayTrigger>
                        </div>
                        <div className="settings-container-child">
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="button-tooltip-2">Inscribir Alumnos</Tooltip>}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <Link to="/cursos/inscripcionAlumno">
                                        <Button {...triggerHandler} className='settings-button create-button'>
                                            <FontAwesomeIcon icon={faUserPlus} ref={ref} />
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
                    <div className="grid-container">
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export function CursosPublic() {
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
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                        <div className="course-card">
                            <div className="img-container">
                                <a href="#"><img className="course-img" src="/Programm.jpg" alt="Javascript" /></a>
                            </div>
                            <div className="cardText-container">
                                <h3>Cosmetologia</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Consequuntur enim doloribus architecto? Minima consequuntur
                                    culpa voluptate facere iure cum repellendus illo, nesciunt
                                    voluptatum ad ea tempora nemo qui architecto modi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}
export function CrearCurso() {
    return (
        <>
            <section id="crearCurso">
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
                            <h1 className='crearCurso-h1'>Crear curso</h1>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="input-container">
                                    <label for="course-name-input">Nombre del curso</label>
                                    <input id="course-name-input" type="text" className="form-control" placeholder='Ingrese un nombre para el curso' required />
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="input-container">
                                    <label for="course-date-input">Fecha de creacion</label>
                                    <input id="course-date-input" type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-container">
                                    <label for="course-description-textarea">Descripcion</label>
                                    <textarea className='form-control' id="course-description-textarea" placeholder='Ingrese una descripcion acerca del curso a crear..' required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-container">
                                    <label for="course-img-input">Imagen</label>
                                    <input id="course-img-input" type="file" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type='submit' className='btn crearCurso-button'>Crear curso</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export function InscribirAlumno() {
    return (
        <>
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
                            <h1 className="main-title">Inscripcion Alumnos</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="courseSelection-container">
                                <h3 className="courseSelection-title">Seleccione un curso</h3>
                                <select className="form-select">
                                    <option value="">Seleccione un curso</option>
                                    <option value="">Javascript</option>
                                    <option value="">NodeJS</option>
                                    <option value="">MySQl</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <CursoTablaAlumnos />
                        </div>
                    </div>
                    <p>
                        El listado de alumnos es global, osea, todos los alumnos del sistema se listan.<br /><br />
                        <ul>
                            <li>La fila con fondo azul y opcion de eliminar es para los alumnos que si estan inscriptos al curso seleccionado</li><br />
                            <li>los que tienen color por defecto y icono de añadir, son para aquellos alumnos globales.</li>
                        </ul>
                        El icono de añadir, tal como es, permitira añadir al alumno al curso al cual pertenece la lista en la cual se muestra.<br />
                        <strong>Acordate de borrar este texto boludo</strong>
                    </p>


                </div>
            </section>
        </>
    )
}



export default Cursos;