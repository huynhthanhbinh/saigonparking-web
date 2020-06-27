import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { UserServiceClient } from '../api/Actor_grpc_web_pb';

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../saigonparking';
import sessionstorage from 'sessionstorage'
import {

    Link,

} from "react-router-dom";
//  modal Error
import ModalError from './Modal/ModalError'
import exceptionHandler from '../ExceptionHandling'
//Kiem tra va xuly loi Error00001
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';

// //import css
// import '../css/Information.css';

const authService = new AuthServiceClient(API_URL)

const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Information = () => {
    //config Modal Error

    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false)
    const xulyerrorSPE00001 = () => {
        const refreshtoken = Cookies.get('refreshtoken')
        const token = 'Bearer ' + refreshtoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()

        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                setmyError(err.message)
                openModalError()


            } else {

                if (res.getRefreshtoken() === '') {
                    /** luu access token */
                    Cookies.set("token", res.getAccesstoken())
                    console.log("accesstoken mới")
                    setflat(!flat)

                } else {
                    /** luu new access token + new refresh token */
                    Cookies.set("token", res.getAccesstoken())
                    Cookies.set("refreshtoken", res.getRefreshtoken())
                    console.log("refreshtoken + accesstoken mới")
                    setflat(!flat)
                }


            }
        })

    }

    //

    const Auth = React.useContext(AuthApi)


    let [customerObject, setCustomerObject] = React.useState()
    const getInformationUser = async () => {
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new StringValue()
        request.setValue(Cookies.get("checkUserName"))

        userService.getCustomerByUsername(request, metadata, (err, res) => {
            if (err) {
                if (err.message === 'SPE#00001') {
                    xulyerrorSPE00001()
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }
            } else {

                setCustomerObject(userMapper.toCustomerObject(res))

            }

        })


    }

    React.useEffect(() => {
        let unmount = false;
        if (unmount === false) {
            getInformationUser();
        }

        return () => {
            unmount = true
        }
    }, [flat])

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                <Container>
                    <Row style={{ margin: 5 }}>
                        <Col xs={4}> <label htmlFor={props.id || props.name}>{label}</label></Col>
                        <Col xs={4}> <input className="text-input" {...field} {...props} /></Col>
                        <Col xs={4}>  {meta.touched && meta.error ? (
                            <div className="error">{meta.error}</div>
                        ) : null}</Col>
                    </Row>
                </Container>



            </>
        );
    };



    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");

        Cookies.remove("refreshtoken");

        sessionstorage.clear();
    }

    // console.log(customerObject)
    return (
        <>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}

            {customerObject ? <Formik
                initialValues={{
                    userName: customerObject.username,

                    email: customerObject.email,
                    firstName: customerObject.firstName,
                    lastName: customerObject.lastName,
                    phone: customerObject.phone


                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),


                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),

                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    phone: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                })}
                onSubmit={(values, { setSubmitting }) => {


                }}
            >
                <Form className="backgroundinfo" >
                    <Row>
                    <h1>Thông tin cá nhân</h1>
                    </Row>

                    <div className="fontcolorinfo">
                        <MyTextInput
                            label="Username"
                            name="userName"
                            type="text"
                            disabled="disabled"
                        />
                    </div>
                    
                    <div className="fontcolorinfo">
                        <MyTextInput
                            label="Email "
                            name="email"
                            type="email"
                            disabled="disabled"

                        />
                    </div>
                   
                    <div className="fontcolorinfo">
                        <MyTextInput
                            label="Tên"
                            name="firstName"
                            type="text"
                            disabled="disabled"

                        />
                    </div>

                    <div className="fontcolorinfo">
                        <MyTextInput
                            label="Họ"
                            name="lastName"
                            type="text"
                            disabled="disabled"

                        />
                    </div>

                    <div className="fontcolorinfo">
                        <MyTextInput 
                            label="Số điện thoại"
                            name="phone"
                            type="phone"
                            disabled="disabled"

                        />
                    </div>
                   
                    <div className="footer-copyright text-center py-5">
                    
                        <div style={{ marginRight: "24%" }}>
                            <Link to="/profile/update">
                                <button style={{ margin: "1%" }} type="button">
                                    update your information
                        </button>
                            </Link>
                            <button style={{ margin: "1%" }} onClick={ClickLogOut}>Logout</button>
                        </div>
                    
                    </div>
                </Form>
            </Formik> : <button onClick={ClickLogOut}>Logout</button>}

        </>
    )

}

export default Information
