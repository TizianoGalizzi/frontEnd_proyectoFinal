function CursosAdmin() {
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
                                    <Link to="/edit">
                                        <Button className='settings-button edit-button' {...triggerHandler}>
                                            <FontAwesomeIcon icon={faPen} ref={ref} />
                                        </Button>
                                    </Link>
                                )}
                            </OverlayTrigger>
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