import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../saigonparking';
import {
    Link,
    Redirect
} from "react-router-dom";
//modal Error
import ModalError from './Modal/ModalError'
import exceptionHandler from '../ExceptionHandling'
//
//Kiem tra va xuly loi Error00001
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import sessionstorage from 'sessionstorage'
const authService = new AuthServiceClient(API_URL)
//
const userService = new UserServiceClient(API_URL)

// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Update = () => {
    //config Error modal
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
                if (err.message === 'SPE#00001') {
                    Cookies.remove("checkUserName");
                    Cookies.remove("token");

                    Cookies.remove("refreshtoken");

                    sessionstorage.clear()
                }


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
                }


            }
        })

    }
    //
    const Auth = React.useContext(AuthApi)

    let [customerObject, setCustomerObject] = React.useState()
    const [nextpage, setnextpage] = React.useState(false)
    const getInformationUser = async (Auth) => {
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const checkUserName = Cookies.get("checkUserName");
        const request = new StringValue()
        request.setValue(checkUserName)

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
            getInformationUser(Auth);
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

    }
    if (nextpage === true) {
        return (<Redirect to="/profile" />)
    }

    return (
        <>
            <div className="backgroundUpdate">
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

                        // if (values.userName === tmp.username) {
                        //     alert(" Username is not different before")

                        // }
                        // else if (values.passWord === tmp.password) {
                        //     alert(" Password is not different before")

                        // }
                        // else if (values.email === tmp.email) {
                        //     alert(" Email is not different before")

                        // }
                        // else {
                        //     alert("Update is done");
                        //     setSubmitting(false);
                        // }
                        const user = new UserProto.User()
                        const token = 'Bearer ' + Cookies.get("token");
                        const metadata = { 'Authorization': token }
                        const request = new UserProto.Customer()

                        user.setRole(customerObject.role)
                        user.setUsername(Cookies.get("checkUserName"))

                        user.setEmail(values.email)
                        user.setVersion(customerObject.version)
                        request.setUserinfo(user)
                        request.setFirstname(values.firstName)
                        request.setLastname(values.lastName)
                        request.setPhone(values.phone)


                        userService.updateCustomer(request, metadata, (err, res) => {
                            if (err) {
                                if (err.message === 'SPE#00001') {
                                    xulyerrorSPE00001()
                                }
                                else {
                                    setmyError(err.message)
                                    openModalError()
                                }
                            } else {


                                setSubmitting(false);
                                setnextpage(true)
                            }

                        })


                    }}
                >
                    <Form className="formUpdate" >
                    <div></div>
                    <h1>Cập nhật thông tin cá nhân</h1>

                        <div className="fontcolorUpdate">
                            <MyTextInput
                                label="Tài khoản"
                                name="userName"
                                type="text"
                                disabled="disabled"
                            />
                        </div>


                        <div className="fontcolorUpdate">
                            <MyTextInput
                                label="Email "
                                name="email"
                                type="email"

                            />
                        </div>

                        <div className="fontcolorUpdate">
                            <MyTextInput
                                label="Tên"
                                name="firstName"
                                type="text"

                            />
                        </div>

                        <div className="fontcolorUpdate">
                            <MyTextInput
                                label="Họ"
                                name="lastName"
                                type="text"

                            />
                        </div>
                        <div className="fontcolorUpdate">
                            <MyTextInput
                                label="Số điện thoại"
                                name="phone"
                                type="phone"

                            />
                        </div>


                        <Row className="fontcolorUpdate" style={{paddingBottom: "5%" }}>
                           
                                <Col xd="6">
                                <button style={{ }} type="submit" >Cập nhật</button>
                                </Col>  
                                <Col xd="6">
                                <Link to="/profile">
                                <button style={{ }} type="button">
                                    Trở lại
                            </button>
                            </Link>
                                </Col>
                            
                        </Row>

                    </Form>
                </Formik> : null}
            </div>
        </>
    )

}

export default Update
