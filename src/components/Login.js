import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';
import { StatusCode } from 'grpc-web'
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import {

    Link

} from "react-router-dom";
import { API_URL } from '../saigonparking';
//import modal login
import ModalErrorLogin from './Modal/ModalErrorLogin'



const userProto = require('../api/Actor_pb')

const authService = new AuthServiceClient(API_URL)



const Login = () => {
    //config modal Error login
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError,setmyError] = React.useState(null)
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
        request.setRole(userProto.UserRole.CUSTOMER)

        authService.validateUser(request, {}, (err, res) => {

            if (err) {
                
                /** Xu ly error login 8 11 12 13*/
                setmyError(err.message)
                openModalError()
                
            } else {
                console.log('BBBBBBBBBBBBBBBBBBBBB');
                console.log("Bon Map Authenticated");

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
         { modalErrorIsOpen? <ModalErrorLogin modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
            <form onSubmit={formik.handleSubmit}>
                <Container>

                    <Row style={{ margin: 5 }}>
                        <Col xs={4}><label htmlFor="userName">userName</label></Col>
                        <Col xs={4}>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                            />
                        </Col>
                        <Col xs={4}>
                            {formik.touched.userName && formik.errors.userName ? (
                                <div>{formik.errors.userName}</div>
                            ) : null}

                        </Col>
                    </Row>

                    <Row style={{ margin: 5 }}>
                        <Col xs={4}><label htmlFor="passWord">passWord</label></Col>
                        <Col xs={4}>
                            <input
                                id="passWord"
                                name="passWord"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passWord}
                            />
                        </Col>
                        <Col xs={4}>
                            {formik.touched.passWord && formik.errors.passWord ? (
                                <div>{formik.errors.passWord}</div>
                            ) : null}

                        </Col>
                    </Row>

                </Container>


                <div style={{ margin: 10 }}>
                    <button style={{ margin: 10 }} type="submit" >Submit</button>

                    <Link to="/forget-password">FORGOT PASSWORD </Link>
                    <Link to="/clickactivateaccount">ACTIVATE ACCOUNT </Link>

                </div>


            </form>
        </div>
    );
};
export default Login;
