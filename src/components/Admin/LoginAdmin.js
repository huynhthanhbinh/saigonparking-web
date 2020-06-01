import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie';
import { StatusCode } from 'grpc-web'
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
import authProto from '../../api/Auth_pb';


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import {
    BrowserRouter as Router,
    Link,

} from "react-router-dom";
import { API_URL } from '../../saigonparking';

const userProto = require('../../api/Actor_pb')

const authService = new AuthServiceClient(API_URL)



const Login = () => {


    const Auth = React.useContext(AuthApi)
    const [isClick, setIsClick] = React.useState(true)
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
            if (isClick === true) {
                let tmp = callUserLoginService(values.userName, values.passWord, Auth)
                setIsClick(false)
                setTimeout(
                    function () {
                        console.log("đã hết 10s submit")
                        setIsClick(true)
                    }
                    ,
                    2000
                );
            }
            else {
                console.log("chưa hết thời gian đừng nhấn làm gì cho uổng công")
            }


        },
    });

    const callUserLoginService = (username, password, Auth) => {
        const request = new authProto.ValidateRequest();
        request.setUsername(username);
        request.setPassword(password);
        request.setRole(userProto.UserRole.ADMIN)

        authService.validateUser(request, {}, (err, res) => {

            if (err) {
                if (err.code === StatusCode.UNKNOWN) {
                    alert("Tai khoan khong ton tai")
                }
            } else {
                console.log('BBBBBBBBBBBBBBBBBBBBB');
                const resType = res.getResponse();
                const ValidateResponseType = authProto.ValidateResponseType;
                switch (resType) {
                    case ValidateResponseType.AUTHENTICATED: {
                        console.log("Bon Map Authenticated");

                        Auth.setcheckUserName(username)
                        Auth.setAuth(true)


                        Cookies.set("token", res.getAccesstoken())
                        Cookies.set("checkUserName", username)
                        alert("Authenticated")
                        break;
                    }
                    case ValidateResponseType.INCORRECT: {
                        alert("Incorrect Username or Password")
                        console.log("Incorrect Username or Password");
                        break;
                    }
                    case ValidateResponseType.INACTIVATED: {
                        alert(" Inactivated")
                        console.log(" Inactivated");
                        break;
                    }
                    case ValidateResponseType.DISALLOWED: {
                        alert("Disallowed")
                        console.log("Disallowed");
                        break;
                    }
                    default: {
                        alert("User non-exist")
                        console.log("User non-exist");
                        break;
                    }
                }
            }
        })
    }

    return (
        <div className="page-container">
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

                    <Link to="/forget-password">Forget Password</Link>

                </div>


            </form>
        </div>
    );
};
export default Login;
