import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/modal.css'

Modal.setAppElement(document.getElementById("root"));
const UpdateModal = () => {
    
    const [bach, setbach]= React.useState(null)

    useEffect(()=>{
        setbach("KHAI MAP")
    },[])

    console.log(bach)
    
    return (
        <div>{bach}</div>
    )



}
export default UpdateModal;

