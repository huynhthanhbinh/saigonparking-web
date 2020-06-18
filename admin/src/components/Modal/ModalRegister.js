
import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'semantic-ui-react'

const RegisterModal = ({ modalRegisterIsOpen, closeModalRegister }) => {
        return (

            <Modal
                open={modalRegisterIsOpen}
                onRequestClose={closeModalRegister}
            >
                <h2 >ĐĂNG KÝ THÀNH CÔNG , KIỂM TRA EMAIL DI</h2>
                <button onClick={closeModalRegister}>close</button>
            </Modal>
        )

}
export default RegisterModal;

