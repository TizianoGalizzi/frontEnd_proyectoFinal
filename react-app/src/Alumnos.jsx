import './css/listadoAlumnos.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faArrowLeft, faUserPlus, faUserXmark, faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


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

function EditAlumn_Modal(props) {
    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar alumno
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='spaceInModal'>
                            <Col xs={8}>
                                <label for="nombreAlumno-input" className="form-label">Nombre</label>
                                <input id="nombreAlumno-input" type="text" className="form-control" placeholder='Ingrese un nombre'/>
                            </Col>
                            <Col xs={4}>
                                <label className='form-label' for="apellidoAlumno-input">Apellido</label>
                                <input id="apellidoAlumno-input" type="text" className="form-control" placeholder='Ingrese el apaellido'/>
                            </Col>
                        </Row>
                        <Row className='spaceInModal'>
                            <Col xs={12}>
                                <label for="f-nacimiento-input">Fecha de nacimiento</label>
                                <input id="f-nacimiento-input" type="date" className="form-control" />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
function ListaAlumnos(props) {
    const [EditAlumnModal, setEditAlumnModal] = useState(false);
    const [DeleteAlumnModal, setDeleteAlumnModal] = useState(false);
    return (
        <>
            <div>
                <Table responsive="sm" striped bordered>
                    <thead>
                        <tr className='t-head-bg'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tiziano</td>
                            <td>Galizzi</td>
                            <td>46241068</td>
                            <td className='settingsButton-container'>
                                <Button onClick={()=> setEditAlumnModal(true)} className='settingsButton-td td-edit'>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                                <EditAlumn_Modal show={EditAlumnModal} onHide={() => setEditAlumnModal(false)} />
                            </td>
                            <td className='settingsButton-container' >
                                <Button onClick={()=> setDeleteAlumnModal(true)} className='settingsButton-td td-delete'>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </Button>
                                <DeleteAlumn_Modal show={DeleteAlumnModal} onHide={()=> setDeleteAlumnModal(false)} />
                            </td>
                        </tr>
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
                                <Link to="/alumnos/crearAlumno">
                                    <Button id='createAlumn-button' >Crear un alumno?</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p class="filter-text">Filtros:</p>
                        </div>
                    </div>
                    <div class="row filter-container">
                        <div class="col-6 col-sm-2 filter-item">
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
                                <input type="number" class="form-control" id="Age" />
                                <label for="Age">Por edad</label>
                            </div>
                        </div>
                        <div class="col-5 col-sm-3 filter-item">
                            <div class="form-floating">
                                <select class="form-select" id="floatingSelect">
                                    <option selected value="">Javascript</option>
                                    <option value="">Ejemplo2</option>
                                    <option value="">Ejemplo3</option>
                                </select>
                                <label for="floatingSelect">Por alumnos:</label>
                            </div>
                        </div>
                        <div class="col-7 col-sm-4 filter-item">
                            <div class="form-floating">
                                <input type="search" class="form-control" id="searchAlumn" />
                                <label for="searchAlumn">Buscar alumno:</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ListaAlumnos />

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
export function CrearAlumno() {
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
                            <h1 className='crearAlumno-h1'>Crear alumno</h1>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-name-input">Nombres</label>
                                    <input id="alumn-name-input" type="text" className="form-control" placeholder='Ingrese el nombre del alumno' required />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-surname-input">Apellido</label>
                                    <input id="alumn-surname-input" type="text" className="form-control" placeholder='Ingrese el apellido del alumno' required/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-container">
                                    <label className='form-label' for="alumn-birthDate-input">Fecha de nacimiento</label>
                                    <input className='form-control' type="date" id="alumn-birthDate-input" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type='submit' className='btn crearAlumno-button'>Crear alumno</button>
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