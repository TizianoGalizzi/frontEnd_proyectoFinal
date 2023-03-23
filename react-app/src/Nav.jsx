import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'


export default function NavAdmin(props) {
  const quitSession = () => {
    return sessionStorage.clear()
  }
  return (

    <header>
      <Navbar className='navBar-container' expand="lg">
        <Container fluid>
          <Link className='nav-link--title' to='/' >
            <img className='navbar-brand' src='/favicon.ico' />
            TeasyCourses
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <div className="d-flex">
              <Link className='nav-link' to="/">Inicio</Link>

              <NavDropdown title="Cursos" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link className='nav-link' to="/cursos">Cursos</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className='nav-link' to="/cursos/gestCurso">Crear Curso</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Alumnos" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link className='nav-link' to="/alumnos">Listado Alumnos</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className='nav-link' to="/alumnos/gestAlumno">Crear Alumnos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown.Item>
                <Link className='nav-link' to="/setRol">Gestionar Roles</Link>
              </NavDropdown.Item>

              <NavDropdown title={props.nickname} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action4">
                  <a href='/'>
                    <Button onClick={() => quitSession()} variant="danger">Cerrar sesion</Button>{' '}
                  </a>
                </NavDropdown.Item>
              </NavDropdown>


            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>

  )

};
export function NavPublic(props) {
  const quitSession = () => {
    return sessionStorage.clear()
  }
  if (props.token) {
    return (
      <header>
        <Navbar className='navBar-container' expand="lg">
          <Container fluid>
            <Link className='nav-link--title' to='/' >
              <img className='navbar-brand' src='/favicon.ico' />
              TeasyCourses
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <div className="d-flex">
                <Link className='nav-link' to="/">Inicio</Link>
                <Link className='nav-link' to="/cursos">Cursos</Link>
                <NavDropdown title={props.nickname} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action4">
                    <a href='/'>
                      <Button onClick={() => quitSession()} variant="danger">Cerrar sesion</Button>
                    </a>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
    )
  } else {
    return (
      <header>
        <Navbar className='navBar-container' expand="lg">
          <Container fluid>
            <Link className='nav-link--title' to='/' >
              <img className='navbar-brand' src='/favicon.ico' />
              TeasyCourses
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <div className="d-flex">
                <Link className='nav-link' to="/">Inicio</Link>
                <Link className='nav-link' to="/cursos">Cursos</Link>
                <Link className='nav-link' to="/login"><FontAwesomeIcon icon={faRightToBracket} />Iniciar Sesión</Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
    )
  }
}

