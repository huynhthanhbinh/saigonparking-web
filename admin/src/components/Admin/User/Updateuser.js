
import React, { useEffect } from 'react'
import { Modal } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
//CSS
import { UserServiceClient } from '../../../api/Actor_grpc_web_pb';
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb'
import ActorProto from '../../../api/Actor_pb'
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
//Modal Error
import ModalError from '../../Modal/ModalError'
//bắt lỗi error0001
// bắt lỗi error0001 cấp accesctoken mới
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../../../api/Auth_grpc_web_pb';

const authService = new AuthServiceClient(API_URL)
const UserService = new UserServiceClient(API_URL)
const parkinglotService = new ParkingLotServiceClient(API_URL)

const UpdateModal = ({ modalIsOpen, closeModal, user }) => {
    //config Modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    //
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false)
    const xulyerrorSPE00001 = React.useCallback(
        () => {
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
                        setflat(flat => !flat)
                    } else {
                        /** luu new access token + new refresh token */
                        Cookies.set("token", res.getAccesstoken())
                        Cookies.set("refreshtoken", res.getRefreshtoken())
                        console.log("refreshtoken + accesstoken mới")
                        setflat(flat => !flat)
                    }
                }
            })
        },[])

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
    const [IsCustomer, setIsCustomer] = React.useState(null)
    const [users, setUsers] = React.useState(null)
    const [parkingManager, setParkingManager] = React.useState(null)

    useEffect(() => {
        if (modalIsOpen === true) {
            if (user.getRole() === ActorProto.UserRole.CUSTOMER) {
                //getCustomer
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(user.getId());
                UserService.getCustomerById(request, metadata, (err, res) => {
                    if (err) {
                        if (err.message === 'SPE#00001') {
                            xulyerrorSPE00001()
                        }
                        else {
                            setmyError(err.message)
                            openModalError()
                        }
                    } else {
                        setIsCustomer(res)
                    }
                })
            }
            else {
                //getParkingLotEmployee
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get("token");
                const metadata = { 'Authorization': token }
                request.setValue(user.getId());
                UserService.getUserById(request, metadata, (err, res) => {
                    if (err) {
                        if (err.message === 'SPE#00001') {
                            xulyerrorSPE00001()
                        }
                        else {
                            setmyError(err.message)
                            openModalError()
                        }
                    } else {
                        setUsers(res)
                    }
                })
            }

        }
        return () => {
        }
    }, [modalIsOpen, user, modalErrorIsOpen, xulyerrorSPE00001, flat])

    useEffect (()=> {
        if(users){
            const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new Int64Value()
        request.setValue(users.getId())
        parkinglotService.getParkingLotManagedByEmployee(request, metadata, (err, res) => {
            if (err)
            {
                if (err.message === 'SPE#00001') {
                    xulyerrorSPE00001()
                }
                else if (err.message === 'SPE#00008'){
                    setParkingManager([])
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }
            } else {
                setParkingManager(res)
            }
        })
        }
    },[user, users, xulyerrorSPE00001, flat])

    if (modalErrorIsOpen === true) {
        return (
            <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />
        )
    }
    if (user != null) {
        if (user.getRole() === ActorProto.UserRole.CUSTOMER) {
            return (
                <Modal
                    open={modalIsOpen}
                    onClose={() => {
                        closeModal()
                    }}
                    className="modal-content"
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
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Activated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last sign in"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Phone"
                                    name="phone"
                                    type="phone"
                                    disabled="disabled"
                                />
                            </li>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (user.getRole() === ActorProto.UserRole.ADMIN) {
            return (
                <Modal
                    open={modalIsOpen}
                    onClose={() => {
                        closeModal()
                    }}
                    className="modal-content"
                >
                    <h2 >ADMIN</h2>
                    {(users) ? <Formik
                        initialValues={{
                            role: 'ADMIN',
                            userName: users.getUsername(),
                            email: users.getEmail(),
                            isActivated: users.getIsactivated(),
                            lastSignIn: users.getLastsignin(),
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
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Activated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last sign in"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Role"
                                    name="role"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </li>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (user.getRole() === ActorProto.UserRole.GOVERNMENT_EMPLOYEE) {
            return (
                <Modal
                    open={modalIsOpen}
                    onClose={() => {
                        closeModal()
                    }}
                    className="modal-content"
                >
                    <h2 >GOVERNMENT EMPLOYEE</h2>
                    {(users) ? <Formik
                        initialValues={{
                            id: users.getId(),
                            role: 'GOVERNMENT EMPLOYEE',
                            userName: users.getUsername(),
                            email: users.getEmail(),
                            isActivated: users.getIsactivated(),
                            lastSignIn: users.getLastsignin(),
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
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Activated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last sign in"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </li>
                            {/* <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>
                            </div> */}
                        </Form>
                    </Formik> : null}
                    <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (user.getRole() === ActorProto.UserRole.PARKING_LOT_EMPLOYEE) {
            return (
                <Modal
                    open={modalIsOpen}
                    onClose={() => {
                        closeModal()
                    }}
                    className="modal-content"
                >
                    <h2 >PARKING LOT EMPLOYEE</h2>
                    {(users && parkingManager) ? <Formik
                        initialValues={{
                            id: users.getId(),
                            userName: users.getUsername(),
                            email: users.getEmail(),
                            isActivated: users.getIsactivated(),
                            lastSignIn: users.getLastsignin(),
                            management: parkingManager[0] ? parkingManager.getId() + ': ' + parkingManager.getInformation().getName() : 'Not yet'
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
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Activated"
                                    name="isActivated"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last sign in"
                                    name="lastSignIn"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"
                                    disabled="disabled"
                                />
                            </li>
                            <li style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Management "
                                    name="management"
                                    type="text"
                                    disabled="disabled"
                                />
                            </li>
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

