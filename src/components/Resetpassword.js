import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const gatewayHost = "http://localhost:8338";

const userService = new UserServiceClient(gatewayHost)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;
let username = localStorage.getItem("username");

const Resetpassword = () => {


    const Auth = React.useContext(AuthApi)
    const [nextpage, setnextpage] = React.useState(false)
    let [customerObject, setCustomerObject] = React.useState()


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

                        const user = new UserProto.User()
                        const token = 'Bearer ' + Cookies.get("token");
                        const metadata = { 'Authorization': token }
                        const request = new UserProto.UpdatePasswordRequest()

                        request.setUsername(username)
                        request.setNewpassword(values.passWord)

                        userService.updatePassword(request, metadata, (err, res) => {
                            if (err) {
                                console.log(err)
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
            </Formik> ):  
            (nextpage === true ) ? (<Redirect to="/login" />)
            :(<Redirect to="/forget-password" />)}
        </>
    )

}

export default Resetpassword
