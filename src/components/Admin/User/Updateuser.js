
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/modal.css'

Modal.setAppElement(document.getElementById("root"));
const UpdateModal = ({ modalIsOpen, closeModal, parkinglot }) => {
    let subtitle;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        }
    };
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

    if (parkinglot != null) {
        return (

            <Modal
                isOpen={modalIsOpen}
               
                onRequestClose={closeModal}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>UPDATE USER</h2>




                <Formik
                    initialValues={{
                        userName: parkinglot.getUsername(),
                        passWord: parkinglot.getUsername(),
                        email: '',
                        firstName: parkinglot.getUsername(),
                        lastName: parkinglot.getUsername(),
                        phone: ''


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

                    })}
                    onSubmit={(values, { setSubmitting }) => {

                    }}
                >
                    <Form >

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
                </Formik>

                <button onClick={closeModal}>close</button>
            </Modal>
        )

    }
    else {
        return null
    }




}
export default UpdateModal;

