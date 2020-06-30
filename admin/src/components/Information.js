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
import {
   
    Link,
  
} from "react-router-dom";
//  modal Error
import ModalError from './Modal/ModalError'
import exceptionHandler from '../ExceptionHandling'
import sessionstorage from 'sessionstorage' 
const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Information = () => {
    //config Modal Error

    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError,setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //

    const Auth = React.useContext(AuthApi)
   
   
    let [customerObject, setCustomerObject] = React.useState()
    const getInformationUser = async () => {
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new StringValue()
        request.setValue(Cookies.get("checkUserName"))

        userService.getUserByUsername(request, metadata, (err, res) => {
            if (err) {
                  if(exceptionHandler.handleAccessTokenExpired(err.message)===false)
                {
                    setmyError('SPE#0000DB')
                }
                else
                {
                    setmyError(err.message)
                }
                

                openModalError()
            } else {

                setCustomerObject(res)

            }

        })


    }

    React.useEffect(() => {

        getInformationUser();

    }, [modalErrorIsOpen])

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
              {modalErrorIsOpen?<ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
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
        
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        
        Cookies.remove("refreshtoken");
        
        sessionstorage.clear()
    }

    // console.log(customerObject)
    return (
        <>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
            
            <h1>Your Information</h1>
            {customerObject ? <Formik
                initialValues={{
                    userName: customerObject.getUsername(),
                 
                    email: customerObject.getEmail(),
                    lastSignIn: customerObject.getLastsignin()
                  


                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                  

                    email: Yup.string()
                        .email('Invalid email address')
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
                            label="lastSignIn "
                            name="lastSignIn"
                            type="text"
                            disabled="disabled"

                        />
                    </div>
                    
               
                    <div style={{ margin: 10 }}>
                        


                        <button style={{ margin: 10 }} onClick={ClickLogOut}>Logout</button>

                    </div>

                </Form>
            </Formik> : <button onClick={ClickLogOut}>Logout</button>}
        </>
    )

}

export default Information
