import './css/register.css'
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'bootstrap';

function Register() {
    document.title = 'Registro';
    const [registerData, setRegisterData] = useState({
        nickname: "",
        email: "",
        password: "",
        rol: "alumno"
    })
    debugger
    const [show, setShow] = useState({
        status: false,
        message: ""
    })
    const registerInputHandler = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }
    let navigate = useNavigate();
    const registerSave = (event) => {
        event.preventDefault();
        let request = {
            method: 'PUT',
            body: JSON.stringify(registerData),
            headers: { 'Content-type': 'application/json' }
        }
        fetch('http://localhost:3030/register', request)
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
                     navigate('/login');
                } else {
                    let errMsg = result.body.message;
                    setShow({
                        status: true,
                        message: errMsg
                    })
                }
            }),
            (error) => {
                console.log(error)

            }
    }
    return (
        <>
            <section id="register">
                <div className="register-container">
                    <div className="registerLeft-container">
                        <div className="waveSvg-container"></div>
                        <div className="registerLeft-title">
                            <h1>Registro</h1>
                            <p>
                                Unete a nosotros y accede a todos los cursos para formarte y
                                obtener ese trabajo de tus sueños.
                            </p>
                        </div>
                        <Alert show={show.status} onClose={() => setShow({ status: false })} dismissible variant="danger">
                            <p>
                                {show.message}
                            </p>
                        </Alert>
                        <div className="registerLeft-form">
                            <form>
                                <div className="input-container">
                                    <label className="inputLabel" for="username"
                                    >Nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Ingrese su nombre de usuario"
                                        autocomplete="off"
                                        onChange={registerInputHandler}
                                        name="nickname"
                                        required
                                    />
                                </div>
                                <div className="input-container">
                                    <label className="inputLabel" for="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Ingrese su correo electronico"
                                        autocomplete="off"
                                        onChange={registerInputHandler}
                                        name="email"
                                        required
                                    />
                                </div>
                                <div className="input-container">
                                    <label className="inputLabel" for="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        onChange={registerInputHandler}
                                        name="password"
                                        required
                                    />
                                </div>
                                <div className="signUp-button">
                                    <button onClick={registerSave} className="registerB" type="submit">Registrarse</button>
                                </div>
                            </form>
                            <p className="login-link--p">
                                Ya tienes una cuenta?
                                <Link to="/login" className="login-link" href="login.html">Inicia sesion</Link>
                            </p>
                        </div>
                    </div>
                    <div className="registerRight-container">
                        <img src="/registerCharacter.svg" alt="registerImg" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;