import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'semantic-ui-react'
import '../../css/Loginform.css'

import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie';
import { StatusCode } from 'grpc-web'
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
import authProto from '../../api/Auth_pb';


import Container from "react-bootstrap/Container";

import {
    Link
} from "react-router-dom";
import { API_URL } from '../../saigonparking';
//import modal login
import ModalErrorLogin from '../Modal/ModalErrorLogin'

const userProto = require('../../api/Actor_pb')

const authService = new AuthServiceClient(API_URL)



const Login = () => {
    //config modal Error login
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //


    const Auth = React.useContext(AuthApi)

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

    return (
        <section>
            <div className="Surface"></div>
            <div className="Car"></div>
            <div className="MainLogin">
                <div className="page-container">
                    {modalErrorIsOpen ? <ModalErrorLogin modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                    <Container className="containerForm" >
                        <div className="form" >
                            <h2>Admin</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="inputBox">
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

                                <div className="inputBox">
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

                                <div className="inputBox">
                                    <input type="submit" value="Login"></input>
                                </div>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
};
export default Login;
