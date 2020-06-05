
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/modal.css'

import { UserServiceClient } from '../../../api/Actor_grpc_web_pb';
import ActorProto from '../../../api/Actor_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie'

import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import Pagination from "react-js-pagination";
import userMapper from '../../../mapper/UserMapper';
const UserService = new UserServiceClient(API_URL)

Modal.setAppElement(document.getElementById("root"));
const UpdateModal = ({ modalIsOpen, closeModal, parkinglot }) => {
    let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        return subtitle.style.color = '#f00';
    }

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

                    </Row>
                    <Row>  {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
                    </Row>
                </Container>



            </>
        );
    };
    const [IsUser, setIsUser] = React.useState(null)
    const [IsCustomer, setIsCustomer] = React.useState(null)
    const [IsParkingLotEmployee, setIsParkingLotEmployee] = React.useState(null)

    const callGetUserById = async () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId());

        UserService.getUserById(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {
                setIsUser(res)


            }
        })
    }
    const callGetCustomerById = async () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId());

        UserService.getCustomerById(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {
                setIsCustomer(res)


            }
        })
    }
    const callGetParkingLotEmployeeById = async () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId());

        UserService.getParkingLotEmployeeById(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {
                setIsParkingLotEmployee(res)


            }
        })
    }


    useEffect(() => {
        if(modalIsOpen === true)
        {
            if (parkinglot.getRole() === 0) {
                //getCustomer
                callGetCustomerById()
            }
            if (parkinglot.getRole() === 1) {
                //getParkingLotEmployee
                callGetParkingLotEmployeeById()
            }
            if (parkinglot.getRole() === 2) {
                //getUser
                callGetUserById()
            }
            if (parkinglot.getRole() === 3) {
                //getUser
                callGetUserById()
            }
        }
      

        return () => {
           
            setIsUser(null)
            setIsCustomer(null)
            setIsParkingLotEmployee(null)
        
           
        }
    }, [modalIsOpen])

    

    if (parkinglot != null) {
        if (parkinglot.getRole() === 0) {

            return (

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={()=>{
                     
                        closeModal()
                       
                    }}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>CUSTOMER</h2>


                    {(IsCustomer) ? <Formik
                        initialValues={{
                            id: IsCustomer.getUserinfo().getId(),
                            userName: IsCustomer.getUserinfo().getUsername(),
                            passWord: IsCustomer.getUserinfo().getPassword(),
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
                            passWord: Yup.string()
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

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Password"
                                    name="passWord"
                                    type="passWord"
                                />
                            </div>


                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="First Name"
                                    name="firstName"
                                    type="text"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Last Name"
                                    name="lastName"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Phone"
                                    name="phone"
                                    type="phone"

                                />
                            </div>


                            <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>

                            </div>

                        </Form>
                    </Formik> : null}

                    <button onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 1) {
            return (

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={()=>{
                      
                        closeModal()
                       
                    }}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>PARKING LOT EMPLOYEE</h2>


                    {(IsParkingLotEmployee) ? <Formik
                        initialValues={{
                            id: IsParkingLotEmployee.getUserinfo().getId(),
                            role: IsParkingLotEmployee.getUserinfo().getRole(),
                            userName: IsParkingLotEmployee.getUserinfo().getUsername(),
                            passWord: IsParkingLotEmployee.getUserinfo().getPassword(),
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
                            passWord: Yup.string()
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

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="role"
                                    name="role"
                                    type="text"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Password"
                                    name="passWord"
                                    type="passWord"
                                />
                            </div>


                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"

                                />
                            </div>

                           



                            <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>

                            </div>

                        </Form>
                    </Formik> : null}

                    <button onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 2) {
            return (

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={()=>{
                       
                        closeModal()
                       
                    }}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>GOVERMENT_EMPLOYEE</h2>


                    {(IsUser) ? <Formik
                        initialValues={{
                            id: IsUser.getId(),
                            userName: IsUser.getUsername(),
                            passWord: IsUser.getPassword(),
                            email: IsUser.getEmail(),
                            isActivated: IsUser.getIsactivated(),
                            lastSignIn: IsUser.getLastsignin(),



                        }}
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            passWord: Yup.string()
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

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Password"
                                    name="passWord"
                                    type="passWord"
                                />
                            </div>


                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"

                                />
                            </div>





                            <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>

                            </div>

                        </Form>
                    </Formik> : null}

                    <button onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 3) {
            return (

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={()=>{
                       
                        closeModal()
                       
                    }}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>ADMIN</h2>


                    {(IsUser) ? <Formik
                        initialValues={{
                            id: IsUser.getId(),
                            userName: IsUser.getUsername(),
                            passWord: IsUser.getPassword(),
                            email: IsUser.getEmail(),
                            isActivated: IsUser.getIsactivated(),
                            lastSignIn: IsUser.getLastsignin(),



                        }}
                        validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            passWord: Yup.string()
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

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="lastSignIn"
                                    name="lastSignIn"
                                    type="text"

                                />
                            </div>

                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Username"
                                    name="userName"
                                    type="text"

                                />
                            </div>
                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Password"
                                    name="passWord"
                                    type="passWord"
                                />
                            </div>


                            <div style={{ margin: 10 }}>
                                <MyTextInput
                                    label="Email "
                                    name="email"
                                    type="email"

                                />
                            </div>





                            <div style={{ margin: 10 }}>
                                <button type="submit" >Update</button>

                            </div>

                        </Form>
                    </Formik> : null}

                    <button onClick={closeModal}>close</button>
                </Modal>
            )
        }


    }
    else {
        return <div>XẢY RA LỖI KHI LOAD DỮ LIỆU</div>
    }




}
export default UpdateModal;

