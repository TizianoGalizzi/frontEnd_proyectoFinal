import './css/login.css'
function Login() {
    return (
        <>
        <div className="bodyClone">
            <section id="login">
                <div className="login-container">
                    <div className="loginLeft-container">
                        <div className="loginLeft-title">
                            <h1 className="loginLeft-title-h1">Bienvenido de vuelta</h1>
                            <p className='loginLeft-title-p'>Bienvenido! Porfavor ingrese sus datos</p>
                        </div>
                        <div className="loginLeft-form">
                            <form>
                                <div className="input-container">
                                    <label className="inputLabel" for="username"
                                    >Email o nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Correo o nombre de usuario"
                                        autocomplete="off"
                                    />
                                </div>
                                <div className="input-container">
                                    <label className="inputLabel" for="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                    />
                                </div>

                                <div className="input-container--rmberMe">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckChecked"
                                            checked
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
                                    <button className="loginB" type="submit">Iniciar sesión</button>
                                </div>

                                <div className="signIn-button--g">
                                    <button className="loginB g-loginB" type="submit">
                                        <i className="fa-brands fa-google"></i>Iniciar sesión con Google
                                    </button>
                                </div>
                            </form>
                            <p className="register-link--p">
                                No tienes una cuenta?
                                <a className="register-link" href="register.html">Registrate</a>
                            </p>
                        </div>
                    </div>
                    <div className="loginRight-container">
                        <img src="/src/characterSlider.svg" alt="loginImg" />
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Login;