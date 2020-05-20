import React, { Component } from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const gatewayHost = "http://localhost:8338";

const userService = new UserServiceClient(gatewayHost)
var globalbien;

const user = new UserProto.User();

const Information = () => {


    const Auth = React.useContext(AuthApi)
    const [tmp, settmp] = React.useState(null)

    const getInformationUser = async (Auth) => {
        const metadata = { 'Authorization': 'Bon Map' }
        const request = new StringValue()
        request.setValue(Auth.checkUserName)

        userService.getUserByUsername(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            } else {

                user.setUsername(res.getUsername())
                user.setPassword(res.getPassword())

                user.setEmail(res.getEmail())


                settmp({ username: user.getUsername(), password: user.getPassword(), email: user.getEmail() })

            }

        })


    }

    React.useEffect(() => {

        getInformationUser(Auth);

    }, [])





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



    const ClickLogOut = () => {
        Auth.setAuth(false)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
    }

    console.log(tmp)
    return (
        <>
            <h1>Update Your Information</h1>
            {tmp ? <Formik
                initialValues={{
                    userName: tmp.username,
                    passWord: tmp.password,
                    email: tmp.email,


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


                })}
                onSubmit={(values, { setSubmitting }) => {
                    if(values.userName === tmp.username)
                    {
                        alert(" Username is not different before")

                    }
                    else if(values.passWord === tmp.password)
                    {
                        alert(" Password is not different before")

                    }
                    else if(values.email === tmp.email)
                    {
                        alert(" Email is not different before")

                    }
                    else 
                    {
                        alert("Update is done");
                        setSubmitting(false);
                    }
                   

                }}
            >
                <Form >

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="User Name"
                            name="userName"
                            type="text"

                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="PassWord"
                            name="passWord"
                            type="passWord"
                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Email Address"
                            name="email"
                            type="email"

                        />
                    </div>

                    <button type="submit" >Update</button>
                    <div style={{ margin: 10 }}>
                        

                        <button onClick={ClickLogOut}>Logout</button>
                    </div>

                </Form>
            </Formik> : null}
        </>
    )

}

export default Information
