
import React, { useEffect } from 'react'
import { Modal } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
//CSS
import '../../../css/formparkinguser.css'
import { UserServiceClient } from '../../../api/Actor_grpc_web_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
//Modal Error
import ModalError from '../../Modal/ModalError'
import exceptionHandler from '../../../ExceptionHandling'

const UserService = new UserServiceClient(API_URL)

const UpdateModal = ({ modalIsOpen, closeModal, parkinglot }) => {
    //config Modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)

    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field/*, meta*/] = useField(props);
        return (
            <>
                <Container>
                    <Row style={{ margin: 5 }}>
                        <Col xs={4}> <label htmlFor={props.id || props.name}>{label}</label></Col>
                        <Col xs={4}> <input className="inputparkinglotuser" {...field} {...props} /></Col>
                    </Row>
                    {/* <Row>  {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
                    </Row> */}
                </Container>
            </>
        );
    };
    const [IsUser, setIsUser] = React.useState(null)
    const [IsCustomer, setIsCustomer] = React.useState(null)
    const [IsParkingLotEmployee, setIsParkingLotEmployee] = React.useState(null)

    useEffect(() => {
        if (modalIsOpen === true) {
            if (parkinglot.getRole() === 0) {
                //getCustomer
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(parkinglot.getId());
                UserService.getCustomerById(request, metadata, (err, res) => {
                    if (err) {
                        if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                            setmyError('SPE#0000DB')
                        }
                        else {
                            setmyError(err.message)
                        }
                        openModalError()
                    } else {
                        setIsCustomer(res)
                    }
                })
            }
            if (parkinglot.getRole() === 1) {
                //getParkingLotEmployee
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(parkinglot.getId());
                UserService.getParkingLotEmployeeById(request, metadata, (err, res) => {
                    if (err) {
                        if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                            setmyError('SPE#0000DB')
                        }
                        else {
                            setmyError(err.message)
                        }

                        openModalError()
                    } else {
                        setIsParkingLotEmployee(res)
                    }
                })
            }
            if (parkinglot.getRole() === 2) {
                //getUser
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(parkinglot.getId());
                UserService.getUserById(request, metadata, (err, res) => {
                    if (err) {
                        if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                            setmyError('SPE#0000DB')
                        }
                        else {
                            setmyError(err.message)
                        }
                        openModalError()
                    } else {
                        setIsUser(res)
                    }
                })
            }
            if (parkinglot.getRole() === 3) {
                //getUser
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(parkinglot.getId());
                UserService.getUserById(request, metadata, (err, res) => {
                    if (err) {
                        if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                            setmyError('SPE#0000DB')
                        }
                        else {
                            setmyError(err.message)
                        }
                        openModalError()
                    } else {
                        setIsUser(res)
                    }
                })
            }
        }
        return () => {
            setIsUser(null)
            setIsCustomer(null)
            setIsParkingLotEmployee(null)
        }
    }, [modalIsOpen, parkinglot,modalErrorIsOpen])
    if(modalErrorIsOpen===true)
    {
        return (
        <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />
        )
    }
    if (parkinglot != null) {
        if (parkinglot.getRole() === 0) {
            return (
                <Modal
                    open={modalIsOpen}
                    onRequestClose={() => {
                        closeModal()
                    }}
                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2 >CUSTOMER</h2>
                    {(IsCustomer) ? <Formik
                        initialValues={{
                            id: IsCustomer.getUserinfo().getId(),
                            userName: IsCustomer.getUserinfo().getUsername(),
                            email: IsCustomer.getUserinfo().getEmail(),
                            isActivated: IsCustomer.getUserinfo().getIsactivated(),
                            lastSignIn: IsCustomer.getUserinfo().getLastsignin(),
                            firstName: IsCustomer.getFirstname(),
                            lastName: IsCustomer.getLastname(),
                            phone: IsCustomer.getPhone()
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
                            isActivated: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            lastSignIn: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                        }}
                    >
                        <Form >
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="isActivated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    disabled="disabled"
                                />  
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Phone"
                                    name="phone"
                                    type="phone"
                                    disabled="disabled"
                                />
                            </div>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 1) {
            return (
                <Modal
                    open={modalIsOpen}
                    onRequestClose={() => {
                        closeModal()
                    }}
                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2 >PARKING LOT EMPLOYEE</h2>
                    {(IsParkingLotEmployee) ? <Formik
                        initialValues={{
                            id: IsParkingLotEmployee.getUserinfo().getId(),
                            role: IsParkingLotEmployee.getUserinfo().getRole(),
                            userName: IsParkingLotEmployee.getUserinfo().getUsername(),
                            email: IsParkingLotEmployee.getUserinfo().getEmail(),
                            isActivated: IsParkingLotEmployee.getUserinfo().getIsactivated(),
                            lastSignIn: IsParkingLotEmployee.getUserinfo().getLastsignin(),
                        }}
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            role: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            isActivated: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            lastSignIn: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                        }}
                    >
                        <Form >
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="isActivated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="role"
                                    name="role"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </div>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 2) {
            return (
                <Modal
                    open={modalIsOpen}
                    onRequestClose={() => {
                        closeModal()
                    }}
                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2 >GOVERMENT_EMPLOYEE</h2>
                    {(IsUser) ? <Formik
                        initialValues={{
                            id: IsUser.getId(),
                            userName: IsUser.getUsername(),
                            email: IsUser.getEmail(),
                            isActivated: IsUser.getIsactivated(),
                            lastSignIn: IsUser.getLastsignin(),
                        }}
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            isActivated: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            lastSignIn: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                        }}
                    >
                        <Form >
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="isActivated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </div>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 3) {
            return (
                <Modal
                    open={modalIsOpen}
                    onRequestClose={() => {
                        closeModal()
                    }}
                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2 >ADMIN</h2>
                    {(IsUser) ? <Formik
                        initialValues={{
                            id: IsUser.getId(),
                            userName: IsUser.getUsername(),
                            email: IsUser.getEmail(),
                            isActivated: IsUser.getIsactivated(),
                            lastSignIn: IsUser.getLastsignin(),
                        }}
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            isActivated: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            lastSignIn: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                        }}
                    >
                        <Form >
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="isActivated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </div>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
    }
    else {
        return <div>XẢY RA LỖI KHI LOAD DỮ LIỆU</div>
    }
}

export default UpdateModal;

