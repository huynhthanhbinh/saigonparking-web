import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../../css/login1.css'

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

            } else {
                // console.log('BBBBBBBBBBBBBBBBBBBBB');
                // console.log("Bon Map Authenticated");

                Auth.setcheckUserName(username)
                Auth.setAuth(true)


                Cookies.set("token", res.getAccesstoken())
                Cookies.set("refreshtoken", res.getRefreshtoken())
                Cookies.set("checkUserName", username)

            }
        })
    }

    return (
        <div className="page-container">
            {modalErrorIsOpen ? <ModalErrorLogin modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
            <Container>
                <form onSubmit={formik.handleSubmit}>


            
                    <label htmlFor="userName">USERNAME</label>

                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                    />


                    {formik.touched.userName && formik.errors.userName ? (
                        <div style={{ margin: 10 ,color:"yellow" }} >{formik.errors.userName}</div>
                    ) : null}




                    <label htmlFor="passWord">PASSWORD</label>

                    <input
                        id="passWord"
                        name="passWord"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passWord}
                    />

                    {formik.touched.passWord && formik.errors.passWord ? (
                        <div style={{ margin: 10 ,color:"yellow" }} >{formik.errors.passWord}</div>
                    ) : null}




                    <div style={{ margin: 10 }}>
                        <button style={{ margin: 10 }} type="submit" >Submit</button>

                        <Link style={{color:'cyan'}} to="/forget-password">Forget Password</Link>

                    </div>

                </form>
            </Container>

        </div>
    );
};
export default Login;