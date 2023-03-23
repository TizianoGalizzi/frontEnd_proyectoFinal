import './css/login.css'
import { useEffect, useState } from 'react';
import { Link, useFetchers, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    document.title = 'Login'
    const [userData, setUserData] = useState({
        nickname: "",
        password: ""
    })
    const [show, setShow] = useState({
        status: false,
        message: ""
    })
    const loginInputHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }
    let navigate = useNavigate();
    const loginSave = (event) => {
        event.preventDefault();
        let request = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json' }
        }
        fetch('http://localhost:3030/login', request)
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
                    sessionStorage.setItem('token', result.body.token);
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
                    return navigate('/');
                } else {
                    let err = result.body.message
                    setShow({
                        status: true,
                        message: err
                    })

                }
            }),
            (error) => {
                console.log(error)

            }
    }
    useEffect(()=>{ 
        return console.log("pagina reiniciada")
    },[show])
    return (
        <>
            <section id="login">
                <div className="login-container">
                    <div className="loginLeft-container">
                        <div className="loginLeft-title">
                            <h1 className="loginLeft-title-h1">Bienvenido</h1>
                            <p className='loginLeft-title-p'>Bienvenido! Porfavor ingrese sus datos</p>
                            <Alert show={show.status} onClose={() => setShow({status:false})} dismissible variant="danger">
                                <p>
                                    {show.message}
                                </p>
                            </Alert>
                        </div>
                        <div className="loginLeft-form">
                            <form>
                                <div className="input-container">
                                    <label className="loginInputLabel" for="username"
                                    >Nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Ingrese su nombre de usuario"
                                        autocomplete="off"
                                        name='nickname'
                                        onChange={loginInputHandler}
                                    />
                                </div>
                                <div className="input-container">
                                    <label className="loginInputLabel" for="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        name='password'
                                        onChange={loginInputHandler}
                                    />
                                </div>

                                <div className="input-container--rmberMe">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckChecked"

                                        />
                                        <label className="form-check-label" for="flexCheckChecked">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="f-pssw-container">
                                        <a className="login-link" href="#">Olvidaste tu contraseña?</a>
                                    </div>
                                </div>
                                <div className="signIn-button">
                                    <button onClick={loginSave} className="loginB" type="submit">Iniciar sesión</button>
                                </div>

                                <div className="signIn-button--g">
                                    <button className="loginB g-loginB" type="submit">
                                        <i className="fa-brands fa-google"></i>Iniciar sesión con Google
                                    </button>
                                </div>
                            </form>
                            <p className="register-link--p">
                                No tienes una cuenta?
                                <Link to="/register" className="register-link"> Registrate</Link>
                            </p>
                        </div>
                    </div>
                    <div className="loginRight-container">
                        <img src="/characterSlider.svg" alt="loginImg" />
                    </div>
                </div>
            </section>
        <ToastContainer/>
        </>
    )
}

export default Login;