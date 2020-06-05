
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
    const [character, setcharacter] = React.useState(null)
    
    const callGetUserById = async () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId());

        UserService.getUserById(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {
                setcharacter(res)


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
                setcharacter(res)


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
                setcharacter(res)


            }
        })
    }


    useEffect(() => {
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

        return ()=>{
           
            setcharacter(null)
        }
    }, [parkinglot.getId()])

    console.log(character)

    if (parkinglot != null) {
        if (parkinglot.getRole() === 0) {
            
            return (

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={closeModal}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>CUSTOMER</h2>


                   {(character)? <Formik
                        initialValues={{
                            id: character.getUserinfo().getId(),
                            userName: character.getUserinfo().getUsername(),
                            passWord: character.getUserinfo().getPassword(),
                            email: character.getUserinfo().getEmail(),
                            isActivated: character.getUserinfo().getIsactivated(),
                            lastSignIn: character.getUserinfo().getLastsignin(),
                            firstName: character.getFirstname(),
                            lastName: character.getLastname(),
                            phone: character.getPhone()


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
                    </Formik> : null }

                    <button onClick={closeModal}>close</button>
                </Modal>
            )
        }
        else if (parkinglot.getRole() === 1) {
            return <div>PARKING_LOT_EMPLOYEE</div>
        }
        else if (parkinglot.getRole() === 2) {
            return <div>GOVERMENT_EMPLOYEE</div>
        }
        else if (parkinglot.getRole() === 3) {
            return <div>ADMIN</div>
        }
        // return (

        //     <Modal
        //         isOpen={modalIsOpen}

        //         onRequestClose={closeModal}

        //         contentLabel="Example Modal"
        //         className="modal-content"
        //         overlayClassName="modal-overlay"
        //     >

        //         <h2 ref={_subtitle => (subtitle = _subtitle)}>UPDATE USER</h2>




        //         <Formik
        //             initialValues={{
        //                 userName: parkinglot.getUsername(),
        //                 passWord: parkinglot.getUsername(),
        //                 email: '',
        //                 firstName: parkinglot.getUsername(),
        //                 lastName: parkinglot.getUsername(),
        //                 phone: ''


        //             }}
        //             validationSchema={Yup.object({
        //                 userName: Yup.string()
        //                     .max(15, 'Must be 15 characters or less')
        //                     .required('Required'),
        //                 passWord: Yup.string()
        //                     .max(15, 'Must be 15 characters or less')
        //                     .required('Required'),

        //                 email: Yup.string()
        //                     .email('Invalid email address')
        //                     .required('Required'),

        //                 firstName: Yup.string()
        //                     .max(15, 'Must be 15 characters or less')
        //                     .required('Required'),
        //                 lastName: Yup.string()
        //                     .max(15, 'Must be 15 characters or less')
        //                     .required('Required'),
        //                 phone: Yup.string()
        //                     .max(15, 'Must be 15 characters or less')
        //                     .required('Required'),

        //             })}
        //             onSubmit={(values, { setSubmitting }) => {

        //             }}
        //         >
        //             <Form >

        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="Username"
        //                         name="userName"
        //                         type="text"

        //                     />
        //                 </div>

        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="Password"
        //                         name="passWord"
        //                         type="passWord"
        //                     />
        //                 </div>
        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="Email "
        //                         name="email"
        //                         type="email"

        //                     />
        //                 </div>

        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="First Name"
        //                         name="firstName"
        //                         type="text"

        //                     />
        //                 </div>

        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="Last Name"
        //                         name="lastName"
        //                         type="text"

        //                     />
        //                 </div>
        //                 <div style={{ margin: 10 }}>
        //                     <MyTextInput
        //                         label="Phone"
        //                         name="phone"
        //                         type="phone"

        //                     />
        //                 </div>


        //                 <div style={{ margin: 10 }}>
        //                     <button type="submit" >Update</button>

        //                 </div>

        //             </Form>
        //         </Formik>

        //         <button onClick={closeModal}>close</button>
        //     </Modal>
        // )

    }
    else {
        return <div>XẢY RA LỖI KHI LOAD DỮ LIỆU</div>
    }




}
export default UpdateModal;

