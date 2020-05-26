import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const gatewayHost = "http://localhost:8338";

const userService = new UserServiceClient(gatewayHost)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;
let username = localStorage.getItem("username");
const Resetpassword = () => {


    const Auth = React.useContext(AuthApi)
    const [tmp, settmp] = React.useState(null)
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



    const ClickLogOut = () => {

    }

    console.log(customerObject)
    return (
        <>
            <h1>Hi , {username} </h1>
            {username ? <Formik
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

                    // if (values.userName === tmp.username) {
                    //     alert(" Username is not different before")

                    // }
                    // else if (values.passWord === tmp.password) {
                    //     alert(" Password is not different before")

                    // }
                    // else if (values.email === tmp.email) {
                    //     alert(" Email is not different before")

                    // }
                    // else {
                    //     alert("Update is done");
                    //     setSubmitting(false);
                    // }

                    if (values.passWord !== values.confirmpassWord) {
                        alert("password ")
                    }
                    else {


                        const user = new UserProto.User()
                        const token = 'Bearer ' + Cookies.get("token");
                        const metadata = { 'Authorization': token }
                        const request = new UserProto.UpdatePasswordRequest()

                        request.setUsername(username)
                        request.setPassword(values.passWord)

                        userService.updatePassword(request, metadata, (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {

                                console.log("Reset Password thanh cong")

                                localStorage.removeItem("username");
                                setSubmitting(false);
                            }

                        })

                    }
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


                        <button onClick={ClickLogOut}>Quay lai</button>
                    </div>

                </Form>
            </Formik> : null}
        </>
    )

}

export default Resetpassword
