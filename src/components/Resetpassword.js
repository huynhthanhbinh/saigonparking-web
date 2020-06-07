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
//modal Error
import ModalError from './Modal/ModalError'
import exceptionHandler from '../ExceptionHandling'

const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;
let username = localStorage.getItem("username");

const Resetpassword = () => {

    //config Error modal
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





    return (
        <>
             {modalErrorIsOpen?<ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
            <h1>Hi , {username} </h1>
            {username && nextpage ? (<Formik
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


                    console.log(values.passWord)


                    const token = 'Bearer ' + Cookies.get("token");
                    const metadata = { 'Authorization': token }
                    const request = new UserProto.UpdatePasswordRequest()

                    request.setUsername(username)
                    request.setNewpassword(values.passWord)

                    userService.updatePassword(request, metadata, (err, res) => {
                        if (err) {
                            if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                                setmyError('SPE#0000DB')
                            }
                            else {
                                setmyError(err.message)
                            }


                            openModalError()
                        } else {

                            console.log("Reset Password thanh cong")

                            localStorage.removeItem("username");
                            setnextpage(true)
                            setSubmitting(false);
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
            </Formik>) :
                (nextpage === true) ? (<Redirect to="/login" />)
                    : (<Redirect to="/forget-password" />)}
        </>
    )

}

export default Resetpassword
