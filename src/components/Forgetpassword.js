import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'

import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const userProto = require('../api/Actor_pb')


const gatewayHost = "http://localhost:8338";

const authService = new AuthServiceClient(gatewayHost)



const Forgetpassword = () => {
    const Auth = React.useContext(AuthApi)
   
    const [sendemail, setsendemail] = React.useState(true)
    const callResetPassword = (username, Auth) => {
        const request = new StringValue()
        const metadata = {};
        request.setValue(username)
        
        authService.sendResetPasswordEmail(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                setsendemail(false)
                // localStorage.setItem("username", username)
            }

        })
    }
  
    const formik = useFormik({
        initialValues: {
            userName: '',


        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),


        }),
        onSubmit: values => {

            callResetPassword(values.userName, Auth)
            

        },
    });

    return (
        <>{
            (sendemail === true)?(
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ margin: 10 }}>
                        <label htmlFor="userName">USERNAME</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div>{formik.errors.userName}</div>
                        ) : null}
                    </div>

                    <div style={{ margin: 10 }}>
                        <button style={{ margin: 10 }} type="submit" >Submit</button>

                    </div>

                </form>
            ):
            (<Redirect to="/" />)
        }
                
            
        </>
    );
};
export default Forgetpassword;
