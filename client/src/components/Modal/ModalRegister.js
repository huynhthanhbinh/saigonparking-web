
import React from 'react'
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../../css/modal.css'

Modal.setAppElement(document.getElementById("root"));
const RegisterModal = ({ modalRegisterIsOpen, closeModalRegister }) => {
    


        return (

            <Modal
                isOpen={modalRegisterIsOpen}
               
                onRequestClose={closeModalRegister}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 >ĐĂNG KÝ THÀNH CÔNG , KIỂM TRA EMAIL DI</h2>

                <button onClick={closeModalRegister}>close</button>
            </Modal>
        )

}
export default RegisterModal;

