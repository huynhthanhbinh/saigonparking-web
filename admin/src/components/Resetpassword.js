import React from 'react'

import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {


    Redirect
} from "react-router-dom";
import { API_URL } from '../saigonparking';
import AuthApi from "./Auth/AuthAPI";
//modal Error
import ModalError from './Modal/ModalError'
import sessionstorage from 'sessionstorage' 
import exceptionHandler from '../ExceptionHandling'
const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;
let username = Cookies.get("checkUserName");
const Resetpassword = () => {
    //config modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //
    const [nextpage, setnextpage] = React.useState(false)

    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
       
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        
        Cookies.remove("refreshtoken");

        sessionstorage.clear()
    }

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
        );
    };

    if(nextpage===true)
    {
        return ( <Redirect to="/login" />)
    }


    return (
        <>
             { modalErrorIsOpen? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
            <h1>Hi , {username} </h1>
            {username ? (<Formik
                initialValues={{

                    passWord: '',
                    confirmpassWord: '',

                }}
                validationSchema={Yup.object({

                    passWord: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    confirmpassWord: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required')
                        .oneOf([Yup.ref('passWord'), null], 'Passwords must match'),


                })}
                onSubmit={(values, { setSubmitting }) => {


                    // console.log(values.passWord)


                    const token = 'Bearer ' + Cookies.get("token");
                    const metadata = { 'Authorization': token }
                    const request = new UserProto.UpdatePasswordRequest()

                    request.setUsername(username)
                    request.setNewpassword(values.passWord)

                    userService.updatePassword(request, metadata, (err, res) => {
                        if (err) {
                            // console.log(err.message)
                            if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                                setmyError('SPE#0000DB')
                            }
                            else {
                                setmyError(err.message)
                            }


                            openModalError()
                        } else {

                            // console.log("Reset Password thanh cong")
                            // console.log(res)
                            localStorage.removeItem("username");
                          
                            setSubmitting(false);
                            ClickLogOut()
                            setnextpage(true)
                        }

                    })


                }}
            >
                <Form >


                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Password"
                            name="passWord"
                            type="passWord"
                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Confirm Password"
                            name="confirmpassWord"
                            type="passWord"
                        />
                    </div>


                    <button type="submit" >Update</button>
                    <div style={{ margin: 10 }}>



                    </div>

                </Form>
            </Formik>) : null}

        </>
    )

}

export default Resetpassword
