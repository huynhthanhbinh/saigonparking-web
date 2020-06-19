import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Loginform.module.css'
import AuthApi from "../../Auth/AuthAPI";
import Cookies from 'js-cookie';
import { AuthServiceClient } from '../../../api/Auth_grpc_web_pb';
import authProto from '../../../api/Auth_pb';
import Container from "react-bootstrap/Container";
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
    const [typeButton, setTypeButton] = React.useState("submit")
    const [enter, setEnter] = React.useState(false)

    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            userName: '',
            passWord: '',

        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            passWord: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),

        }),
        onSubmit: values => {
            setTypeButton("")
            setIsLoading(true)
            callUserLoginService(values.userName, values.passWord, Auth)
        },
    });

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
                setTypeButton("submit")

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

    const handleEnter = () => {
        setEnter(true)
    }

    return (
        <>
            <section className={styles.section}>
                <div className={styles.Surface}></div>
                <div className={styles.Car}></div>

                {enter ? <div className={styles.MainLogin}>
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
                        <a href='# ' onClick={handleEnter} className={styles.enterbutton}>ENTER</a>
                    </div>
                </div>
                }
            </section>
        </>
    );
};
export default Login;
