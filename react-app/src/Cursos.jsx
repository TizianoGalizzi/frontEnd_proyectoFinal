import './css/style.css'
import './css/cursos.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'

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
                            <Button className='settings-button edit-button' onClick={() => setModalEdit(true)}>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <ModalEdit show={modalEdit} onHide={() => setModalEdit(false)} />
                        </div>
                        <div className="settings-container-child">
                            <Link to="/cursos/crear_curso">
                                <Button className='settings-button create-button'>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </Link>
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


function CursosPublic() {
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
                                <textarea className='form-control' id="course-description-textarea" placeholder='Ingrese una descripcion acerca del curso a crear..'></textarea>
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
                            <button type='submit' className='btn btn-primary'>Crear curso</button>
                        </div>
                    </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Cursos;