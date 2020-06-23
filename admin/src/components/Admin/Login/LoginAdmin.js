import React from 'react';
import styles from './Loginform.module.css'
import AuthApi from "../../Auth/AuthAPI";
import Cookies from 'js-cookie';
import { AuthServiceClient } from '../../../api/Auth_grpc_web_pb';
import authProto from '../../../api/Auth_pb';
import { API_URL } from '../../../saigonparking';
//import modal login
import ModalErrorLogin from '../../Modal/ModalErrorLogin'

const userProto = require('../../../api/Actor_pb')

const authService = new AuthServiceClient(API_URL)

const Login = () => {
    //config modal Error login
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const Auth = React.useContext(AuthApi)
    const [enter, setEnter] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const callUserLoginService = (username, password, Auth) => {
        const request = new authProto.ValidateRequest();
        request.setUsername(username);
        request.setPassword(password);
        request.setRole(userProto.UserRole.ADMIN)

        authService.validateUser(request, {}, (err, res) => {
            if (err) {
                /** Xy ly error login */
                setmyError(err.message)
                openModalError()
                setIsLoading(false)
            } else {
                Auth.setcheckUserName(username)
                Auth.setAuth(true)
                //set cookies when success
                Cookies.set("token", res.getAccesstoken())
                Cookies.set("refreshtoken", res.getRefreshtoken())
                Cookies.set("checkUserName", username)
            }
        })
    }

    const handleSubmit = () => {
        setIsLoading(true)
        callUserLoginService(email, password, Auth)
    }

    const handleEnter = () => {
        setEnter(true)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }


    return (
        <div>
            <section className={styles.section}>
                <div className={styles.Surface}></div>
                <div className={styles.Car}></div>
            </section>
            {enter ?
                <div>
                    <div className={styles.backgroundForm}>
                        {isLoading ? <section className={styles.seperatorwrapper}>
                            <div className={`${styles.seperator} ${styles.gradient}`}>
                            </div>
                        </section> : <></>}
                    </div>
                    <div className={styles.MainLogin}>
                        <div className={styles.box}>
                            {modalErrorIsOpen ? <ModalErrorLogin modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                            <form autoComplete='off' onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }} className={styles.white} >
                                <h1>Log in</h1>
                                <div className={styles.inputbox}>
                                    <input type="email" required name="email" placeholder="example@mail.com" onChange={onChangeEmail} />
                                    <label>Email Address</label>
                                </div>
                                <div className={styles.inputbox}>
                                    <input type="password" required name="password" placeholder="***************" onChange={onChangePassword} />
                                    <label>Password</label>
                                    <a href="# ">Forgot password?</a>
                                </div>
                                <div className={styles.check}>
                                    <input type="checkbox" value="x" />
                                    <p>Keep me logged in</p>
                                    <input disabled={isLoading} type="submit" value={isLoading ? 'Loading !' : 'Log in'} />
                                </div>
                                <div className={styles.signup}>
                                    <p href="# ">Don't have an account? <a href="# " className={styles.signer}>Sign up</a></p>
                                </div>
                            </form>
                            <div className={styles.welcome}>
                                <h1>Welcome <span>to</span></h1>
                                <img className={styles.logoo} src={require("./parking.png")} alt="logo" />
                                <h4>Login to access your account</h4>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.MainLogin}>
                        <div className={styles.pagecontainer}>
                            {modalErrorIsOpen ? <ModalErrorLogin modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                            <Container className={styles.containerForm} >
                                {isLoading ? <>
                                    <span className={styles.spanH}></span>
                                    <span className={styles.spanH}></span>
                                    <span className={styles.spanVL}></span>
                                    <span className={styles.spanVR}></span>
                                </> : <></>
                                }
                                <div className={styles.form} >
                                    <h2>Admin</h2>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className={styles.inputBox}>
                                            <input
                                                id="userName"
                                                name="userName"
                                                type="text"
                                                placeholder="User Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.userName}
                                                autoComplete="off"
                                            />
                                        </div>
                                        {formik.touched.userName && formik.errors.userName ? (
                                            <div style={{ color: "yellow" }} >{formik.errors.userName}</div>
                                        ) : null}

                                        <div className={styles.inputBox}>
                                            <input
                                                placeholder="Password"
                                                id="passWord"
                                                name="passWord"
                                                type="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.passWord}
                                                autoComplete="off"
                                            />
                                        </div>
                                        {formik.touched.passWord && formik.errors.passWord ? (
                                            <div style={{ color: "yellow" }} >{formik.errors.passWord}</div>
                                        ) : null}

                                        <div className={styles.inputBox}>
                                            <input type={typeButton} disabled={isLoading} value="Login"></input>
                                        </div>
                                    </form>
                                </div>
                            </Container>
                        </div>
                    </div> */}
                </div> : <></>}
            {enter ? <></> :
                <div className={styles.welcomsection}>
                    <div className={styles.contenwrap}>
                        <ul className={styles.flytext}>
                            <li>S</li>
                            <li>A</li>
                            <li>I</li>
                            <li>G</li>
                            <li>O</li>
                            <li>N</li>
                            <li>P</li>
                            <li>A</li>
                            <li>R</li>
                            <li>K</li>
                            <li>I</li>
                            <li>N</li>
                            <li>G</li>
                        </ul>
                        <a href='# ' onClick={(e) => {
                            e.preventDefault();
                            handleEnter(e)
                        }} className={styles.enterbutton}>ENTER</a>
                    </div>
                </div>
            }
        </div>
    );
};
export default Login;
